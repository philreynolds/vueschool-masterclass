<template>

  <div class="col-large push-top">

    <h1 class="text-left">
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', id }"
        class="btn-green btn-small"
        tag="button"
      >
        Edit Thread
      </router-link>
    </h1>

    <p class="text-left">
      By <a href="#" class="link-unstyled">{{ thread.author.name }}</a>, <AppDate :timestamp="thread.publishedAt"></AppDate> hours ago.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{ thread.repliesCount }} replies by {{ thread.contributorsCount }} contributors</span>
    </p>

    <post-list :posts="threadPosts"></post-list>
    <post-editor @save="addPost"/>

  </div>

</template>

<script>

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
      newPostText: 'Temp Text'
    }
  },
  computed: {
    threads () {
      return this.$store.state.threads
    },
    posts () {
      return this.$store.state.posts
    },
    thread () {
      return this.$store.getters.thread(this.id)
    },
    threadPosts () {
      return this.posts.filter(p => p.threadId === this.id)
    }
  },
  methods: {
    addPost (eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id
      }
      this.$store.dispatch('createPost', post)
    }
  }
}

</script>

<style scoped>

</style>
