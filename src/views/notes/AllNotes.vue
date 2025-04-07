<template>
  <div class="all-notes">
    <note-list></note-list>
  </div>
</template>

<script>
import NoteList from '@/components/NoteList.vue'

export default {
  name: 'AllNotes',
  components: {
    NoteList
  },
  created() {
    // 初始化加载笔记列表
    this.$store.dispatch('notes/fetchNotes')
  }
}
</script>

<style lang="scss" scoped>
.all-notes {
  height: 100%;
}
</style> 