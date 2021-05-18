<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="thread_content">My Comment</label>
        <textarea
          v-model = "text"
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

export default {
  data () {
    return {
      text: ''
    }
  },
  methods: {
    save () {
      const post = {
        text: this.text
      }
      this.$emit('save', { post })
      this.text = ''
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
