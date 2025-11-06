<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  isPublic: true,
})
</script>

<template>
  <UMain class="flex flex-col justify-center items-center">
    <LoginForm />
  </UMain>
</template>
