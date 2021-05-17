<template>
  <div class="profile-card">

    <p class="text-center">
      <img :src="user.avatar" :alt="`${ user.name } profile picture`" class="avatar-xlarge">
    </p>

    <h1 class="title">{{ user.username }}</h1>

    <p class="text-lead text-left">{{ user.name }}</p>

    <p class="text-left">
      {{ user.bio || 'No bio specified'}}
    </p>

    <div class="text-left">
      <span class="online">{{ user.username }} is online in {{user.location}}</span>
    </div>

    <div class="stats">
      <span>{{ user.postsCount }} posts</span>
      <span>{{ user.threadsCount }} threads</span>
    </div>

    <hr>
    <p v-if="user.website" class="text-large text-center"><i class="fa fa-globe"></i> <a :href="user.website">{{ user.website }}</a></p>
    <div class="text-center push-top">
      <router-link
        :to="{ name: 'ProfileEdit' }"
        class="btn-green btn-small">
        Edit Profile
      </router-link>
    </div>
  </div>

  <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

</template>

<script>
export default {
  name: 'UserProfileCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
