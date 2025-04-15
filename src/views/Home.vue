<script setup lang="ts">
// 1. 导入路由hook（必须在setup顶部调用）
import { useRouter } from 'vue-router'
// 2. 获取路由实例
const router = useRouter()

// 3. 跳转到编辑页（通常在事件处理函数中调用）
const goToEditPage = () => {
  router.push({
    name: 'Edit', // 使用路由名称（更安全，避免路径硬编码）
    // params: { id: '123' }, // 可选：携带动态参数（需路由配置支持）
  })
}

const goToDiaryListPage = () => {
  router.push({
    name: 'DiaryList',
    // params:{}
  })
}
</script>

<template>
  <nav>
    <!-- 4. 绑定点击事件触发导航 -->
    <button @click="goToEditPage">写下来</button>
    <button @click="goToDiaryListPage">过往想法</button>
  </nav>
</template>

<style scoped></style>
