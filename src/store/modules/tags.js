export default {
  namespaced: true,
  state: {
    tags: [
      { id: 1, name: '随手记' },
      { id: 2, name: '会议纪要' },
      { id: 3, name: '重要任务' }
    ]
  },
  mutations: {
    ADD_TAG(state, tag) {
      state.tags.push(tag)
    }
  }
} 