<template>

  <h1>Welcome to the Forum!</h1>
  <category-list :categories="categories"/>

</template>

<script>

import sourceData from '@/data.json'
import categoryList from '@/components/CategoryList'

export default {
  name: 'PageHome',
  components: {
    categoryList
  },
  data () {
    return {
      categories: sourceData.categories
    }
  }
}

</script>

<style scoped>

</style>
