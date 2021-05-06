<template>
  <h1>{{ category.name }}</h1>
  <forum-list
    :forums="getForumsForCategory(category)"
    :title="category.name"
  />
</template>

<script>
import sourceData from '@/data.json'
import ForumList from '@/components/ForumList'

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
      return sourceData.categories.find(c => c.id === this.id)
    }
  },
  methods: {
    getForumsForCategory (category) {
      return sourceData.forums.filter(f => f.categoryId === category.id)
    }
  }
}
</script>

<style scoped>

</style>
