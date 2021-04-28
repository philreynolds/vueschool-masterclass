<template>
  <span :title="humanFriendlyDate()">
    {{ diffForHumans() }}
  </span>
</template>

<script>
// Import DayJS
import dayjs from 'dayjs'
import relativetime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativetime)
dayjs.extend(localizedDate)

export default {
  name: 'AppDate',
  props: {
    timestamp: {
      required: true,
      type: Number
    }
  },
  methods: {
    diffForHumans () {
      return dayjs.unix(this.timestamp).fromNow()
    },
    humanFriendlyDate () {
      return dayjs.unix(this.timestamp).format('llll')
    }
  }
}
</script>

<style scoped>

</style>
