<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  isPublic: true,
})
</script>

<template>
  <UMain class="flex flex-col items-center justify-center">
    <LoginForm />
  </UMain>
</template>
