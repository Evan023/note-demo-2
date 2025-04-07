<template>
  <div class="sidebar-menu">
    <div class="nav-menu">
      <el-menu :default-active="activeMenu" router>
        <el-menu-item index="/">
          <i class="el-icon-document"></i>
          <span>全部便签</span>
        </el-menu-item>
        <el-menu-item index="/trash">
          <i class="el-icon-delete"></i>
          <span>废纸篓</span>
        </el-menu-item>
      </el-menu>
    </div>
    
    <div class="tags-menu">
      <div class="tags-title">标签</div>
      <el-menu>
        <el-menu-item 
          v-for="tag in tags" 
          :key="tag.id"
          :index="String(tag.id)"
          @click="filterByTag(tag.id)"
        >
          <span>{{ tag.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarMenu',
  computed: {
    ...mapState('tags', ['tags']),
    activeMenu() {
      return this.$route.path
    }
  },
  methods: {
    filterByTag(tagId) {
      // 实现按标签筛选的功能
    }
  }
}
</script>

<style scoped>
.sidebar-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tags-title {
  padding: 15px;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
}
</style> 