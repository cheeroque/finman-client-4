import { FetchError } from 'ofetch'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (to.meta.isPublic || authStore.isLoggedIn || to.path.startsWith('/api/')) {
    return
  }

  try {
    authStore.user = await useRequestFetch()('/api/me')
  } catch (error) {
    // Throw all errors except auth related further
    if (!(error instanceof FetchError && error.statusCode === 401)) {
      throw error
    }

    return navigateTo('/login', {
      external: true,
    })
  }
})
