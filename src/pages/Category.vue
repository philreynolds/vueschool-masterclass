<template>
  <h1>{{ category.name }}</h1>
  <forum-list
    :forums="getForumsForCategory(category)"
    :title="category.name"
  />
</template>

<script>

import ForumList from '@/components/ForumList'
import { findById } from '@/helpers'

export default {
  name: 'Category',
  components: {
    ForumList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    category () {
      return findById(this.$store.state.categories, this.id) || {}
    }
  },
  methods: {
    getForumsForCategory (category) {
      return this.$store.state.forums.filter(f => f.categoryId === category.id)
    }
  },
  async created () {
    const category = await this.$store.dispatch('fetchCategory', { id: this.id })
    const forums = await this.$store.dispatch('fetchForums', { ids: category.forums })
  }
}
</script>

<style scoped>

</style>
