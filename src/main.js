import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import AppDate from '@/components/AppDate'

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)

forumApp.component('AppDate', AppDate)

forumApp.mount('#app')
