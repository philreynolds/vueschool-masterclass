<template>

  <div class="col-large push-top">

    <h1>{{thread.title}}</h1>

    <post-list :posts="threadPosts"></post-list>

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

  </div>

</template>

<script>
import sourceData from '@/data.json'
import PostList from '@/components/PostList.vue'

export default {
  name: 'ThreadShow',
  components: {
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
      posts: sourceData.posts,
      newPostText: 'Temp Text'
    }
  },
  computed: {
    thread () {
      return this.threads.find(thread => thread.id === this.id)
    },
    threadPosts () {
      return this.posts.filter(post => post.threadId === this.id)
    }
  },
  methods: {
    addPost () {
      const postId = 'gggg' + Math.random()
      const post = {
        id: postId,
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId: 'NnooaWj4KHVxbhKwO1pEdfaQDsD2'
      }
      this.posts.push(post)
      this.thread.posts.push(postId)
      this.newPostText = ''
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
