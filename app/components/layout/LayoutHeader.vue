<script setup lang="ts">
const { state } = useQuery<number>({
  key: ['balance'],
  query: () => useRequestFetch()('/api/transactions/total'),
})

const { formatNumber } = useLocaleFormatter()

const title = computed(() => formatNumber(state.value.data ?? 0))
</script>

<template>
  <UHeader :title />
</template>
