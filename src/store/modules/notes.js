export default {
  namespaced: true,
  state: {
    notes: [],
    currentNote: null,
    recentEdited: [],
    trashedNotes: []
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes
    },
    SET_CURRENT_NOTE(state, note) {
      state.currentNote = note
    },
    ADD_NOTE(state, note) {
      state.notes.unshift(note)
    },
    UPDATE_NOTE(state, note) {
      const index = state.notes.findIndex(n => n.id === note.id)
      if (index !== -1) {
        state.notes.splice(index, 1, note)
      }
    },
    DELETE_NOTE(state, noteId) {
      const note = state.notes.find(n => n.id === noteId)
      if (note) {
        state.trashedNotes.unshift(note)
        state.notes = state.notes.filter(n => n.id !== noteId)
      }
    },
    RESTORE_NOTE(state, note) {
      state.trashedNotes = state.trashedNotes.filter(n => n.id !== note.id)
      state.notes.unshift(note)
    },
    DELETE_FOREVER(state, noteId) {
      state.trashedNotes = state.trashedNotes.filter(note => note.id !== noteId)
    },
    CLEAR_TRASH(state) {
      state.trashedNotes = []
    }
  },
  actions: {
    fetchNotes({ commit }) {
      // 这里后续会调用 API
      const mockNotes = [
        { id: 1, title: '测试笔记', content: '内容', tagId: 1, isPinned: false }
      ]
      commit('SET_NOTES', mockNotes)
    }
  }
} 