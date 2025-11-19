<script setup lang="ts">
async function logout() {
  await useRequestFetch()('/api/logout', { method: 'POST' })

  return navigateTo('/login')
}
</script>

<template>
  <UiButtonLink
    class="
      flex w-full items-center justify-start gap-6 rounded-xl
      bg-(--c-app-hover-bg) px-6 py-5 text-start text-lg font-medium
      text-(--c-text-highlight) transition-colors
      hover:bg-(--c-app-active-bg)
    "
    @click="logout()"
  >
    <span class="flex-auto">
      {{ $ts('mainMenu.logout') }}
    </span>

    <span class="flex size-6">
      <Icon
        name="mingcute:exit-line"
        class="text-2xl"
      />
    </span>
  </UiButtonLink>
</template>
