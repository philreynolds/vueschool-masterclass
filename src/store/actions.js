import { docToResource, findById } from '@/helpers'
import firebase from 'firebase'

export default {
  async createPost ({ commit, state }, post) {
    post.userId = state.authId
    post.publishedAt = firebase.firestore.FieldValue.serverTimestamp()
    const batch = firebase.firestore().batch()
    const postRef = firebase.firestore().collection('posts').doc()
    const threadRef = firebase.firestore().collection('threads').doc(post.threadId)
    const userRef = firebase.firestore().collection('users').doc(state.authId)
    batch.set(postRef, post)
    batch.update(threadRef, {
      posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
      contributors: firebase.firestore.FieldValue.arrayUnion(state.authId)
    })
    batch.update(userRef, {
      postsCount: firebase.firestore.FieldValue.increment(1)
    })
    await batch.commit()
    const newPost = await postRef.get()
    commit('setItem', {
      resource: 'posts',
      item: {
        ...newPost.data(),
        id: newPost.id
      }
    })
    commit('appendPostToThread', {
      childId: newPost.id,
      parentId: post.threadId
    })
    commit('appendContributorToThread', {
      childId: state.authId,
      parentId: post.threadId
    })
  },
  async updatePost ({ commit, state }, { text, id }) {
    const post = {
      text,
      edited: {
        at: firebase.firestore.FieldValue.serverTimestamp(),
        by: state.authId,
        moderated: false
      }
    }
    const postRef = firebase.firestore().collection('posts').doc(id)
    await postRef.update(post)
    const updatedPost = await postRef.get()
    commit('setItem', { resource: 'posts', item: updatedPost })
  },
  async createThread ({ commit, state, dispatch }, {
    text,
    title,
    forumId
  }) {
    const userId = state.authId
    const publishedAt = firebase.firestore.FieldValue.serverTimestamp()
    const threadRef = firebase.firestore().collection('threads').doc()
    const thread = { forumId, title, publishedAt, userId, id: threadRef.id }
    const userRef = firebase.firestore().collection('users').doc(userId)
    const forumRef = firebase.firestore().collection('forums').doc(forumId)
    // Process batch
    const batch = firebase.firestore().batch()
    batch.set(threadRef, thread)
    batch.update(userRef, {
      threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id)
    })
    batch.update(forumRef, {
      threads: firebase.firestore.FieldValue.arrayUnion(threadRef.id)
    })
    await batch.commit()
    const newThread = await threadRef.get()
    //
    commit('setItem', {
      resource: 'threads',
      item: {
        ...newThread.data(),
        id: newThread.id
      }
    })
    commit('appendThreadToUser', {
      parentId: userId,
      childId: threadRef.id
    })
    commit('appendThreadToForum', {
      parentId: forumId,
      childId: threadRef.id
    })
    await dispatch('createPost', {
      text,
      threadId: threadRef.id
    })
    return findById(state.threads, threadRef.id)
  },
  async updateThread ({ commit, state }, { id, text, title }) {
    const thread = findById(state.threads, id)
    const post = findById(state.posts, thread.posts[0])
    let newThread = { ...thread, title }
    let newPost = { ...post, text }
    const threadRef = firebase.firestore().collection('threads').doc(id)
    const postRef = firebase.firestore().collection('posts').doc(post.id)
    const batch = firebase.firestore().batch()
    batch.update(threadRef, newThread)
    batch.update(postRef, newPost)
    await batch.commit()
    newThread = await threadRef.get()
    newThread = {
      ...newThread.data(),
      id: newThread.id
    }
    newPost = await postRef.get()
    newPost = {
      ...newPost.data(),
      id: newPost.id
    }
    commit('setItem', {
      resource: 'threads',
      item: newThread
    })
    commit('setItem', {
      resource: 'posts',
      item: newPost
    })
    return docToResource(newThread)
  },
  async registerUserWithEmailAndPassword ({ dispatch }, {
    avatar = null,
    email,
    name,
    username,
    password
  }) {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
    await dispatch('createUser', {
      id: result.user.uid,
      email,
      name,
      username,
      avatar
    })
    await dispatch('createUser', {
      id: result.user.uid,
      email,
      name,
      username,
      avatar
    })
  },
  async signInWithEmailAndPassword (context, { email, password }) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  async signInWithGoogle ({ dispatch }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    const response = await firebase.auth().signInWithPopup(provider)
    const user = response.user
    const userRef = firebase.firestore().collection('users').doc(user.uid)
    const userDoc = await userRef.get()
    if (!userDoc.exists) {
      return dispatch('createUser', {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        username: user.email,
        avatar: user.photoURL
      })
    }
  },
  async signOut ({ commit }) {
    await firebase.auth().signOut()
    commit('setAuthId', null)
  },
  async createUser ({ commit }, {
    id,
    email,
    name,
    username,
    avatar = null
  }) {
    const registeredAt = firebase.firestore.FieldValue.serverTimestamp()
    const usernameLower = username.toLowerCase()
    email = email.toLowerCase()
    const user = {
      avatar,
      email,
      name,
      username,
      usernameLower,
      registeredAt
    }
    const userRef = await firebase.firestore().collection('users').doc(id)
    userRef.set(user)
    const newUser = await userRef.get()
    commit('setItem', {
      resource: 'users',
      item: newUser
    })
    return docToResource(newUser)
  },
  updateUser ({ commit }, user) {
    commit('setItem', {
      resource: 'users',
      item: user
    })
  },
  // ---------------------------------------
  // Fetch Single Resource
  // ---------------------------------------
  fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', {
    emoji: '🏷',
    resource: 'categories',
    id
  }),
  fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', {
    emoji: '🏁',
    resource: 'forums',
    id
  }),
  fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', {
    emoji: '📄',
    resource: 'threads',
    id
  }),
  fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', {
    emoji: '💬',
    resource: 'posts',
    id
  }),
  fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', {
    emoji: '🙋',
    resource: 'users',
    id
  }),
  async fetchAuthUser ({ dispatch, state, commit }) {
    const userId = await firebase.auth().currentUser?.uid
    console.log('userId', userId)
    if (!userId) return
    dispatch('fetchItem', {
      emoji: '🙋',
      resource: 'users',
      id: userId,
      handleUnsubscribe: (unsubscribe) => {
        commit('setAuthUserUnsubscribe', unsubscribe)
      }
    })
    commit('setAuthId', userId)
    return userId
  },
  // ---------------------------------------
  // Fetch All of a Resource
  // ---------------------------------------
  fetchAllCategories ({ commit }) {
    console.log('🔥', '🏷', 'all')
    return new Promise((resolve) => {
      firebase.firestore().collection('categories').onSnapshot((querySnapshot) => {
        const categories = querySnapshot.docs.map(doc => {
          const item = {
            id: doc.id,
            ...doc.data()
          }
          commit('setItem', {
            resource: 'categories',
            item
          })
          return item
        })
        resolve(categories)
      })
    })
  },
  // ---------------------------------------
  // Fetch Multiple Resources
  // ---------------------------------------
  fetchCategories: ({ dispatch }, { ids }) => dispatch('fetchItems', {
    resource: 'categories',
    ids,
    emoji: '🏷'
  }),
  fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', {
    resource: 'forums',
    ids,
    emoji: '🏁'
  }),
  fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', {
    resource: 'threads',
    ids,
    emoji: '📄'
  }),
  fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', {
    resource: 'posts',
    ids,
    emoji: '💬'
  }),
  fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', {
    resource: 'users',
    ids,
    emoji: '🙋'
  }),
  //
  fetchItem ({ state, commit }, { id, emoji, resource, handleUnsubscribe = null }) {
    console.log('🔥', emoji, id)
    return new Promise((resolve) => {
      const unsubscribe = firebase.firestore().collection(resource).doc(id).onSnapshot((doc) => {
        console.log('on snapshot', resource, doc.data())
        const item = {
          ...doc.data(),
          id: doc.id
        }
        commit('setItem', {
          resource,
          item
        })
        resolve(item)
      })
      if (handleUnsubscribe) {
        handleUnsubscribe(unsubscribe)
      } else {
        commit('appendUnsubscribe', { unsubscribe })
      }
    })
  },
  fetchItems ({ dispatch }, {
    ids,
    resource,
    emoji
  }) {
    return Promise.all(ids.map(id => dispatch('fetchItem', {
      id,
      resource,
      emoji
    })))
  },
  async unsubscribeAllSnapshots ({ state, commit }) {
    state.unsubscribes.forEach(unsubscribe => unsubscribe())
    commit('clearAllUnsubscribes')
  },
  async unsubscribeAuthUserSnapshot ({ state, commit }) {
    if (state.authUserUnsubscribe) {
      state.authUserUnsubscribe()
      commit('setAuthUserUnsubscribe', null)
    }
  }
}
