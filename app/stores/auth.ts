import { defineStore } from 'pinia'

import type { UserDto } from '~~/shared/types/user'

export const useAuthStore = defineStore('AuthStore', () => {
  const user = ref<UserDto | null>(null)

  const isLoggedIn = computed(() => !!user.value?.id)

  return {
    isLoggedIn,
    user,
  }
})
