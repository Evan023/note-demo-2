<template>
  <div class="rich-editor">
    <div v-if="currentNote" class="editor-container">
      <div class="editor-header">
        <el-input
          v-model="localNote.title"
          placeholder="请输入标题"
          class="title-input"
          @change="handleChange"
        />
        <div class="editor-actions">
          <el-select 
            v-model="localNote.tagId" 
            placeholder="选择标签"
            size="small"
            @change="handleChange"
          >
            <el-option
              v-for="tag in tags"
              :key="tag.id"
              :label="tag.name"
              :value="tag.id"
            />
          </el-select>
          <el-button 
            type="danger" 
            size="small" 
            icon="el-icon-delete"
            @click="deleteNote"
          >
            删除
          </el-button>
        </div>
      </div>
      
      <div class="editor-content">
        <el-input
          type="textarea"
          v-model="localNote.content"
          :rows="20"
          placeholder="开始编写..."
          @change="handleChange"
        />
      </div>
    </div>
    
    <div v-else class="empty-state">
      <i class="el-icon-document"></i>
      <p>请选择或创建一个便签</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RichEditor',
  
  data() {
    return {
      localNote: null
    }
  },

  computed: {
    ...mapState('notes', ['currentNote']),
    ...mapState('tags', ['tags'])
  },

  watch: {
    currentNote: {
      immediate: true,
      handler(val) {
        this.localNote = val ? { ...val } : null
      }
    }
  },

  methods: {
    handleChange() {
      if (!this.localNote) return
      
      this.localNote.updateTime = new Date().toISOString()
      this.$store.commit('notes/UPDATE_NOTE', this.localNote)
    },

    deleteNote() {
      this.$confirm('确定要删除这个便签吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.commit('notes/DELETE_NOTE', this.currentNote.id)
        this.$store.commit('notes/SET_CURRENT_NOTE', null)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rich-editor {
  height: 100%;
  padding: 16px;

  .editor-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .editor-header {
    margin-bottom: 16px;

    .title-input {
      margin-bottom: 16px;
    }

    .editor-actions {
      display: flex;
      justify-content: space-between;
    }
  }

  .editor-content {
    flex: 1;
  }

  .empty-state {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #909399;

    i {
      font-size: 48px;
      margin-bottom: 16px;
    }
  }
}
</style> 