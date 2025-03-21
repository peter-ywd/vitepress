<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { page } = useData()
</script>

<template>
  <Layout>
    <!-- 默认内容 -->
    <template #doc-after>
      <ClientOnly>
        <!-- Giscus 评论组件 -->
        <GiscusComment
          v-if="page.isNotFound !== true"
          :key="page.relativePath"
        />
      </ClientOnly>
    </template>
  </Layout>
</template>

<style>
/* 自定义评论区域样式 */
.giscus-frame {
  margin-top: 3rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 2rem;
}
</style>