
<template>
  <div class="container" style="width:100%">
      <h1>My Profile</h1>
<!--    <div class="flex-grid">-->
<!--      <div class="col-3 push-top">-->
<!--        <UserProfileCard v-if="!edit" :user="user" />-->
<!--        <UserProfileCardEditor v-else :user="user" />-->
<!--      </div>-->

<!--      <div class="col-7 push-top">-->
<!--        <div class="profile-header">-->
<!--          <span class="text-lead"> {{user.username}} recent activity </span>-->
<!--          <a href="#">See only started threads?</a>-->
<!--        </div>-->
<!--        <hr />-->
<!--        <PostList :posts="user.posts" />-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  // components: {
  //   UserProfileCardEditor,
  //   PostList,
  //   UserProfileCard
  // },
  props: {
    edit: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({ user: 'authUser' })
  },
  created () {
    this.$emit('ready')
  }
}
</script>

<style scoped>

</style>
