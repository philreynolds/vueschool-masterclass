<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">{{ category.name }}</h2>
      <forum-list
        :forums="forumsForCategory (id)"
        :categoryName="category.name"
      />
    </div>
  </div>
</template>

<script>

import sourceData from '@/data.json'
import forumList from '@/components/ForumList'

export default {
  name: 'Category',
  components: {
    forumList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  methods: {
    forumsForCategory (id) {
      return sourceData.forums.filter(f => f.categoryId === this.id)
    }
  },
  computed: {
    category () {
      return sourceData.categories.find(c => c.id === this.id)
    }
  }
}

</script>

<style scoped>

</style>
