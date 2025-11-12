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
  <WidgetBase :title="$ts('sidebar.months')">
    <MonthSelector
      :model-value="selectedPeriod"
      year-class="grid-cols-3 gap-3"
    />
  </WidgetBase>
</template>
