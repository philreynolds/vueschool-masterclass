<template>

  <h1>Welcome to the Forum!</h1>
  <forum-list :forums="forums"/>

</template>

<script>

import sourceData from '@/data.json'
import forumList from '@/components/ForumList'

export default {
  name: 'PageHome',
  components: {
    forumList
  },
  data () {
    return {
      forums: sourceData.forums
    }
  }
}

</script>

<style scoped>

</style>
