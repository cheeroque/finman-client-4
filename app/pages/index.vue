<script setup lang="ts">
const { $localePath } = useI18n()

async function logout() {
  await $fetch('/api/logout', {
    method: 'POST',
  })

  navigateTo($localePath('/login'))
}
</script>

<template>
  <UMain>
    <UButton @click="logout">
      Sign Out
    </UButton>
  </UMain>
</template>
