<template>

  <div class="forum-listing" v-for="forum in forums" :key="forum.id">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{
          name: 'Forum',
          params: {
            id: forum.id }
          }"
      >
        {{ forum.name }}
      </router-link>

    </div>

    <div class="threads-count">
      <p>
        <span class="count">{{ forumThreadCount(forum) }}</span>
        {{ forumThreadWord(forum) }}
      </p>
    </div>

    <div class="last-thread"></div>
  </div>

</template>

<script>
export default {
  name: 'ForumList',
  props: {
    forums: {
      required: true,
      type: Array
    }
  },
  methods: {
    forumThreadCount (forum) {
      if (forum.threads?.length) {
        return forum.threads.length
      } else {
        return 0
      }
    },
    forumThreadWord (forum) {
      if (forum.threads?.length) {
        return forum.threads.length > 1 ? 'Threads' : 'Thread'
      } else {
        return 'Empty'
      }
    }
  }
}
</script>

<style scoped>
.forum-details {
  text-align: left;
}
</style>
