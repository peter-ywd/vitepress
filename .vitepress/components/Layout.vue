<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";

const { Layout } = DefaultTheme;
const { page } = useData();
</script>

<template>
  <Layout>
    <!-- 默认内容 -->
    <template #doc-after>
      <ClientOnly>
        <!-- Giscus 评论组件 -->
        <div class="comment-container">
        <GiscusComment
          v-if="page.isNotFound !== true"
          :key="page.relativePath"
          repo="peter-ywd/vitepress"
          repoId="R_kgDOOMP-Wg"
          category="General"
          categoryId="DIC_kwDOOMP-Ws4CoT2m"
          mapping="pathname"
          reactionsEnabled="true"
          theme="preferred_color_scheme"
          lang="zh-CN"
          loading="lazy"
        />
        </div>
      </ClientOnly>
    </template>
  </Layout>
</template>

<style>
/* 自定义评论区域样式 */
.comment-container {
  margin-top: 3rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 2rem;
}
</style>
