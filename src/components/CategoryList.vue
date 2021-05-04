<template>
  <div class="col-full"
       v-for="category in categories"
       :key="category.id"
  >
    <div class="forum-list">

      <h2 class="list-title">
        <router-link :to="{
                            name: 'Category',
                            params: {
                              id: category.id,
                            }
                          }"
        >
          {{ category.name }}
        </router-link>
      </h2>
      <forum-list :forums="forumsForCategory(category.id)"/>
    </div>
  </div>
</template>

<script>

import sourceData from '@/data.json'
import forumList from '@/components/ForumList'

export default {
  name: 'CategoryList',
  components: {
    forumList
  },
  props: {
    categories: {
      required: true,
      type: Array
    }
  },
  methods: {
    forumsForCategory (categoryId) {
      return sourceData.forums.filter(f => f.categoryId === categoryId)
    }
  }
}

</script>

<style scoped>

</style>
