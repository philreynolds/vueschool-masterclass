<template>
  <div class="col-full">
    <div class="forum-list">

      <h2 class="list-title">
        <router-link
          v-if="categoryId"
          :to="{
            name: 'Category',
            params: {
              id: categoryId
            }
           }"
        >
          {{ title }}
        </router-link>
        <span v-else>{{ title }}</span>
      </h2>

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
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forumThreadCount(forum) }}</span>
            {{ forumThreadWord(forum) }}
          </p>
        </div>

        <div class="last-thread"></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'forumList',
  props: {
    forums: {
      required: true,
      type: Array
    },
    title: {
      required: true,
      type: String,
      default: 'Forums'
    },
    categoryId: {
      required: false,
      type: String
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
