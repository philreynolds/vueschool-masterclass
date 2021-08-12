import { createStore } from 'vuex'
import getters from '@/store/getters'
import actions from '@/store/actions'
import mutations from '@/store/mutations'

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    // authId: null,
    authId: 'zaywCo42CSg3weB5Oh3tK7bNrWg2',
    unsubscribes: [],
    authUserUnsubscribe: null
  },
  getters,
  actions,
  mutations
})
