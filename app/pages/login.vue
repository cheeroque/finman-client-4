<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  isPublic: true,
})
</script>

<template>
  <main
    class="
      m-auto w-full bg-white p-8
      md:w-100 md:rounded-2xl
      dark:bg-black
    "
  >
    <LoginForm />
  </main>
</template>
