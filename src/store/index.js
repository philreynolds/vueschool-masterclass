import { createStore } from 'vuex'
import sourceData from '@/data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: state => {
      const user = state.users.find(user => user.id === state.authId)
      if (!user) return null
      return {
        ...user,
        get posts () {
          return state.posts.filter(p => p.userId === user.id)
        },
        get postsCount () {
          return this.posts.length
        },
        get threads () {
          return state.threads.filter(t => t.userId === user.id)
        },
        get threadsCount () {
          return this.threads.length
        }
      }
    }
  },
  actions: {
    createPost ({ commit, state }, post) {
      post.id = 'gggg' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', { post })
      commit('appendPostToThread', { postId: post.id, threadId: post.threadId })
    },
    createThread ({ commit, state, dispatch }, { text, title, forumId }) {
      // Post Id
      const id = 'gggg' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = { id, userId, forumId, title, publishedAt }
      commit('setThread', { thread })
      commit('appendThreadToForum', { threadId: thread.id, forumId })
      commit('appendThreadToUser', { threadId: thread.id, userId })
      dispatch('createPost', { text, threadId: id })
    },
    updateUser ({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  mutations: {
    setPost (state, { post }) {
      state.posts.push(post)
    },
    setThread (state, { thread }) {
      state.threads.push(thread)
    },
    appendPostToThread (state, { postId, threadId }) {
      const thread = state.threads.find(t => t.id === threadId)
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    appendThreadToForum (state, { threadId, forumId }) {
      const forum = state.forums.find(f => f.id === forumId)
      forum.threads = forum.threads || []
      forum.threads.push(threadId)
    },
    appendThreadToUser (state, { threadId, userId }) {
      const user = state.users.find(f => f.id === userId)
      user.threads = user.threads || []
      user.threads.push(threadId)
    },
    setUser (state, { user, userId }) {
      const userIndex = state.users.findIndex(u => u.id === userId)
      state.users[userIndex] = user
    }
  }
})
