<template>
  <div class="trash">
    <div class="trash-header">
      <h3>废纸篓</h3>
      <el-button 
        type="danger" 
        size="small"
        :disabled="!trashedNotes.length"
        @click="clearTrash"
      >
        清空废纸篓
      </el-button>
    </div>
    
    <div class="trash-content">
      <el-empty v-if="!trashedNotes.length" description="暂无已删除的便签"></el-empty>
      <el-card 
        v-for="note in trashedNotes" 
        :key="note.id"
        shadow="hover"
        class="note-item"
      >
        <div class="note-title">{{ note.title || '无标题' }}</div>
        <div class="note-preview">{{ note.content || '暂无内容' }}</div>
        <div class="note-actions">
          <el-button type="text" size="small" @click="restoreNote(note)">
            恢复
          </el-button>
          <el-button type="text" size="small" @click="deleteForever(note)">
            彻底删除
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Trash',
  
  computed: {
    trashedNotes() {
      return this.$store.state.notes.trashedNotes || []
    }
  },
  
  methods: {
    restoreNote(note) {
      this.$confirm('确定要恢复这个便签吗？', '提示', {
        type: 'info'
      }).then(() => {
        this.$store.commit('notes/RESTORE_NOTE', note)
      })
    },
    
    deleteForever(note) {
      this.$confirm('此操作将永久删除该便签, 是否继续?', '警告', {
        type: 'warning'
      }).then(() => {
        this.$store.commit('notes/DELETE_FOREVER', note.id)
      })
    },
    
    clearTrash() {
      this.$confirm('确定要清空废纸篓吗？此操作不可恢复', '警告', {
        type: 'warning'
      }).then(() => {
        this.$store.commit('notes/CLEAR_TRASH')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.trash {
  height: 100%;
  padding: 20px;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      color: $--color-text-primary;
    }
  }

  &-content {
    height: calc(100% - 60px);
    overflow-y: auto;
  }
}

.note-item {
  margin-bottom: 16px;

  .note-title {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .note-preview {
    color: $--color-text-regular;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .note-actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
}
</style> 