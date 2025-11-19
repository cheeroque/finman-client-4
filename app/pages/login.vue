<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  isPublic: true,
})
</script>

<template>
  <main
    class="
      m-auto w-full bg-(--c-content-bg) p-8 shadow-sm
      md:w-100 md:rounded-2xl
    "
  >
    <LoginForm />
  </main>
</template>
