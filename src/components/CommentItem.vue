<template>
  <Giscus
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
</template>

<script setup>
import Giscus from '@giscus/vue'
import { computed } from 'vue';
import { useRoute, useData } from 'vitepress';

const { theme, page } = useData();

const path = computed(() => useRoute().path);
// const dark = 'html[class="dark"]';
// const {
//   serverURL,
//   lang,
//   locale,
//   emoji,
//   commentSorting,
//   meta,
//   requiredMeta,
//   login,
//   wordLimit,
//   pageSize,
//   imageUploader,
//   highlighter,
//   texRenderer,
//   search,
//   copyright,
//   recaptchaV3Key,
//   turnstileKey,
//   reaction
// } = theme.value?.comment;
</script>

<style scoped>
/* 自定义评论区域样式 */
.comment-container {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 2rem;
}
</style>
