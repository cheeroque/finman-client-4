<script setup lang="ts">
const route = useRoute()

const selectedPeriod = computed(() => {
  const { period } = route.params

  if (!period) {
    return
  }

  const [year, month] = String(period).split('-')

  if (!(year && month)) {
    return
  }

  return {
    month: Number(month),
    year: Number(year),
  }
})
</script>

<template>
  <aside class="px-4 sm:px-6 lg:px-8 py-5">
    <UCard>
      <template #header>
        <p class="font-medium">
          {{ $ts('sidebar.months') }}
        </p>
      </template>

      <MonthSelector
        :model-value="selectedPeriod"
        year-class="grid-cols-3 gap-3"
      />
    </UCard>
  </aside>
</template>
