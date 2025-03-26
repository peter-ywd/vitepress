---
lastUpdated: 2025-03-26
---

# Pinia 学习笔记

Pinia 是 Vue 3 官方推荐的状态管理库，作为 Vuex 的继任者，Pinia 通过采用 Composition API 和更加现代的设计理念，提供了一种更加简洁、灵活和高效的状态管理方案。在这篇笔记中，我们将从高级前端开发的角度深入探讨 Pinia 的核心特性和使用方式。

## 1. Pinia 简介

Pinia 是一个专为 Vue 3 设计的状态管理库，基于 Vue 3 的 Composition API 和 TypeScript，旨在提供更简单、更直观、更灵活的状态管理功能。与 Vuex 相比，Pinia 更加轻量，且支持模块化和严格的类型推导。

## 2. 安装和基本使用

### 2.1 安装 Pinia

在 Vue 3 项目中使用 Pinia，首先需要安装 Pinia 包：

```bash
npm install pinia
2.2 创建 Pinia 实例
创建 Pinia 实例并在 Vue 应用中使用：

js
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
2.3 创建 Store
Pinia 使用 defineStore 函数来定义 store。每个 store 都有自己的状态、getter 和 actions。

js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    reset() {
      this.count = 0
    }
  }
})
2.4 使用 Store
在组件中使用 Pinia store 非常简单，直接使用 useStore 函数即可：

js
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment">Increment</button>
  </div>
</template>

<script>
import { useCounterStore } from './stores/counter'

export default {
  setup() {
    const counter = useCounterStore()

    return { counter }
  }
}
</script>
3. Pinia 的核心特性
3.1 State
State 是 Pinia 中存储的数据，定义在 state 函数中，返回一个对象，该对象包含应用的所有状态。

js
state: () => ({
  user: null,
  isLoggedIn: false
})
Pinia 自动处理响应式，因此无论何时更新状态，视图会自动重新渲染。

3.2 Getters
Getters 类似于 Vuex 中的计算属性，它们是从 state 中派生的数据，并且是只读的。

js
getters: {
  isAuthenticated: (state) => !!state.user
}
3.3 Actions
Actions 用于定义业务逻辑，可以访问 state 和 getters，并且可以处理异步操作。与 Vuex 不同，Pinia 的 actions 直接操作 store 中的状态，不需要通过 commit 或 dispatch。

js
actions: {
  async login(username, password) {
    const user = await api.login(username, password)
    this.user = user
    this.isLoggedIn = true
  }
}
3.4 Store 模块化
Pinia 支持 store 的模块化，每个 store 都可以独立管理其状态和逻辑，并且可以在需要的地方被引用和使用。

js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    login() {
      this.isAuthenticated = true
    },
    logout() {
      this.isAuthenticated = false
    }
  }
})
3.5 Store Persisted State
Pinia 提供了持久化 store 状态的功能，通常用于将用户数据保存在本地存储（localStorage）或会话存储（sessionStorage）中。使用插件 pinia-plugin-persistedstate 来实现这一点。

bash
npm install pinia-plugin-persistedstate
js
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPersist)
然后，你可以在 store 中启用持久化状态：

js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  persist: true
})
3.6 类型推导与 TypeScript 支持
Pinia 完全支持 TypeScript，提供了严格的类型推导。你可以通过类型注解来获得更好的代码补全和类型检查。

ts
import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    }
  }
})
4. 高级用法
4.1 Store 的组合与重用
Pinia 支持将多个 store 组合在一起，创建更加复杂的状态管理逻辑。可以通过 useStore 在多个地方访问和更新状态。

js
// stores/user.js
export const useUserStore = defineStore('user', { ... })

// stores/cart.js
export const useCartStore = defineStore('cart', { ... })

// 在组件中组合使用
import { useUserStore } from './stores/user'
import { useCartStore } from './stores/cart'

export default {
  setup() {
    const userStore = useUserStore()
    const cartStore = useCartStore()

    return { userStore, cartStore }
  }
}
4.2 使用 Pinia 与 Vue Router
Pinia 与 Vue Router 配合使用时，可以将用户认证等状态存储在 store 中，并在页面切换时使用 store 的状态来控制访问权限。

js
// stores/auth.js
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false
  })
})

// router.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth'

const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) {
        next('/login')
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
4.3 动态 Store
Pinia 支持动态创建 store，适用于需要在运行时按需创建 store 的场景。你可以在应用的任何地方动态地定义和访问 store。

js
import { defineStore } from 'pinia'

const useDynamicStore = defineStore('dynamic', {
  state: () => ({
    value: 0
  }),
  actions: {
    increment() {
      this.value++
    }
  }
})
5. 总结
Pinia 是一个轻量、灵活、现代化的状态管理库，完全支持 Vue 3 和 TypeScript。它提供了比 Vuex 更加简洁和高效的 API，特别适合使用 Composition API 的开发者。通过 Pinia，开发者能够轻松管理应用的全局状态，支持模块化、持久化以及类型推导等高级功能。对于 Vue 3 开发者来说，Pinia 是一个值得深入学习和使用的状态管理解决方案。