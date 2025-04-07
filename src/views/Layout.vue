<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="sidebar">
      <sidebar-menu></sidebar-menu>
    </el-aside>
    <el-container>
      <el-main>
        <note-list></note-list>
      </el-main>
      <el-aside width="400px" class="editor-container">
        <rich-editor></rich-editor>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue'
import NoteList from '@/components/NoteList.vue'
import RichEditor from '@/components/RichEditor.vue'

export default {
  name: 'Layout',
  components: {
    SidebarMenu,
    NoteList,
    RichEditor
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.sidebar {
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
}

.editor-container {
  border-left: 1px solid #e0e0e0;
}
</style> 