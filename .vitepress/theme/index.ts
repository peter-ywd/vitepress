// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'


import Layout from "../components/Layout.vue"
import Giscus from '@giscus/vue'

import './style.css'
import './custom.css';
export default {
  extends: DefaultTheme,
  Layout, 
  enhanceApp({ app, router, siteData }) {
    app.component('GiscusComment', Giscus)
    // ...
  }
} satisfies Theme
