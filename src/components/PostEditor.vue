<template>
  <div class="col-full">
    <form @submit.prevent="addPost">
      <div class="form-group">
        <label for="thread_content">My Comment</label>
        <textarea
          v-model = "newPostText"
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        >
          </textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue"
                type="submit"
                name="Publish"
        >Publish</button>
      </div>
    </form>
  </div>
</template>

<script>

import sourceData from '@/data.json'

export default {
  name: 'PostEditor',
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      posts: sourceData.posts,
      threads: sourceData.threads,
      newPostText: ''
    }
  },
  methods: {
    addPost () {
      const postId = 'gggg' + Math.random()
      const post = {
        id: postId,
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: 'NnooaWj4KHVxbhKwO1pEdfaQDsD2'
      }
      this.posts.push(post)
      this.thread.posts.push(postId)
      this.newPostText = ''
    }
  },
  computed: {
    thread () {
      return this.threads.find(t => t.id === this.threadId)
    }
  }
}
</script>

<style scoped>

label {
  font-weight: bold;
  margin-top: 1em;
}

.form-group {
  text-align: left;
  margin-top: 2em;
  border-top: 1px solid #ddd;
}

</style>
