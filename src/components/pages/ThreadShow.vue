<template>

  <div class="col-large push-top">

    <h1>{{thread.title}}</h1>

    <post-list :posts="threadPosts"></post-list>

    <post-editor :threadId="thread.id"></post-editor>

  </div>

</template>

<script>
import sourceData from '@/data.json'
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor'

export default {
  name: 'ThreadShow',
  components: {
    PostEditor,
    PostList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts
    }
  },
  computed: {
    thread () {
      return this.threads.find(thread => thread.id === this.id)
    },
    threadPosts () {
      return this.posts.filter(post => post.threadId === this.id)
    }
  }
}

</script>

<style scoped>

</style>
