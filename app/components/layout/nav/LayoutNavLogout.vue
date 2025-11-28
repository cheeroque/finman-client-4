<script setup lang="ts">
async function logout() {
  await useRequestFetch()('/api/logout', { method: 'POST' })

  return navigateTo('/login')
}
</script>

<template>
  <UiButtonBase
    class="
      flex w-full items-center justify-start gap-6 rounded-xl bg-primary-100/80
      px-6 py-5 text-start text-neutral-800 transition-colors
      hover:bg-primary-50/80
      dark:bg-primary-900/40 dark:text-neutral-300 dark:hover:bg-primary-900/80
    "
    @click="logout"
  >
    <span class="flex-auto">
      {{ $ts('mainMenu.logout') }}
    </span>

    <span class="flex size-6">
      <Icon
        name="mynaui:logout"
        class="text-2xl opacity-80"
      />
    </span>
  </UiButtonBase>
</template>
