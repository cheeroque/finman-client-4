<script setup lang="ts">
const { state } = useQuery({
  key: ['balance'],
  query: () => useRequestFetch()('/api/transactions/total'),
})

const title = computed(() => `${state.value.data}\xA0₽`)
</script>

<template>
  <UHeader :title />
</template>
