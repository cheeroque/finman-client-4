import { defineStore } from 'pinia'

import type { User } from '~~/shared/types/user'

export const useAuthStore = defineStore('AuthStore', () => {
  const user = ref<User | null>(null)

  const isLoggedIn = computed(() => !!user.value?.id)

  return {
    isLoggedIn,
    user,
  }
})
