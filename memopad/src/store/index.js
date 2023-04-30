import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist'

const VuexPersist = new VuexPersistence({
  storage: localStorage
})

export default createStore({
  // 簡単に言うとデータ
  state: {
    count: 0,
    memos: []
  },
  // stateを取ってくる
  getters: {
    getCount: (state) => {
      return state.memos.length
    },
    getAll: (state) => {
      return state.memos
    },
    getMemoById: (state) => (id) => {
      return state.memos.find(memo => memo.id === id)
    }
  },
  // stateを変更する
  mutations: {
    RESTORE_MUTATION: VuexPersist.RESTORE_MUTATION,
    // メモを保存する
    save(state, newMemo) {
      if (newMemo.id) {
        let x = state.memos.find(memo => memo.id === newMemo.id)
        x.title = newMemo.title
        x.content = newMemo.content
      }
      else {
        newMemo.id = ++state.count
        state.memos.unshift(newMemo)
      }
    },
    delete(state, id) {
      state.memos = state.memos.filter(memo => memo.id !== id)
    }
  },
  // 
  actions: {
  },
  // 
  modules: {
  },
  plugins: [VuexPersist.plugin]
})
