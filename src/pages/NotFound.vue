<template>
  <div class="col-full text-center">
    <h1>404 Not Found</h1>
    <router-link :to="{name: 'Home'}">Visit our Threads!</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  created () {
    this.$emit('ready')
  }
}
</script>

<style scoped>

</style>
