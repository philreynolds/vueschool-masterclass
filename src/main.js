import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import AppDate from '@/components/AppDate'
import AppSpinner from '@/components/AppSpinner'
import firebase from 'firebase'
import firebaseConfig from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
  store.dispatch('unsubscribeAuthUserSnapshot')
  if (user) {
    store.dispatch('fetchAuthUser')
  }
})

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.use(FontAwesome)

forumApp.component('AppDate', AppDate)
forumApp.component('AppSpinner', AppSpinner)

forumApp.mount('#app')
