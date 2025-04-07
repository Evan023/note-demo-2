<template>
  <div class="note-list">
    <div class="note-list-header">
      <el-button type="primary" size="small" @click="createNote">
        新建便签
      </el-button>
      <el-dropdown @command="handleSort">
        <el-button size="small">
          排序方式<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="time">最近编辑</el-dropdown-item>
          <el-dropdown-item command="create">创建时间</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="note-list-content">
      <el-card 
        v-for="note in sortedNotes" 
        :key="note.id"
        shadow="hover"
        class="note-item"
        :class="{ 'is-active': currentNote && currentNote.id === note.id }"
        @click="selectNote(note)"
      >
        <div class="note-title">
          <span>{{ note.title || '无标题' }}</span>
          <el-button 
            type="text" 
            class="pin-btn"
            @click.stop="togglePin(note)"
          >
            <i :class="note.isPinned ? 'el-icon-top' : 'el-icon-bottom'"></i>
          </el-button>
        </div>
        <div class="note-preview">{{ note.content || '暂无内容' }}</div>
        <div class="note-meta">
          <span>{{ formatDate(note.updateTime) }}</span>
          <el-tag size="mini" type="info">{{ getTagName(note.tagId) }}</el-tag>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { formatDate } from '@/utils/date'

export default {
  name: 'NoteList',
  
  computed: {
    ...mapState('notes', ['notes', 'currentNote']),
    ...mapState('tags', ['tags']),
    
    sortedNotes() {
      return [...this.notes].sort((a, b) => {
        // 置顶笔记优先
        if (a.isPinned !== b.isPinned) {
          return a.isPinned ? -1 : 1
        }
        // 按更新时间排序
        return new Date(b.updateTime) - new Date(a.updateTime)
      })
    }
  },

  methods: {
    ...mapMutations('notes', ['SET_CURRENT_NOTE', 'UPDATE_NOTE']),
    
    createNote() {
      const newNote = {
        id: Date.now(),
        title: '',
        content: '',
        tagId: null,
        isPinned: false,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      }
      this.$store.commit('notes/ADD_NOTE', newNote)
      this.selectNote(newNote)
    },

    selectNote(note) {
      this.SET_CURRENT_NOTE(note)
    },

    togglePin(note) {
      this.UPDATE_NOTE({
        ...note,
        isPinned: !note.isPinned
      })
    },

    handleSort(command) {
      // 实现排序逻辑
    },

    getTagName(tagId) {
      const tag = this.tags.find(t => t.id === tagId)
      return tag ? tag.name : '未分类'
    },

    formatDate
  }
}
</script>

<style lang="scss" scoped>
.note-list {
  height: 100%;
  display: flex;
  flex-direction: column;

  &-header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
  }

  &-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }
}

.note-item {
  margin-bottom: 16px;
  cursor: pointer;

  &.is-active {
    border: 1px solid #409EFF;
  }

  .note-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-weight: bold;
  }

  .note-preview {
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .note-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;
  }
}
</style> 