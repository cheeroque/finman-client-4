<script setup lang="ts">
const { $ts } = useI18n()

const { view } = useTransactionsQueryParams()

const viewModel = computed({
  get: () => view.value ?? 'all',
  set: (value) => {
    view.value = value === 'all' ? undefined : value
  },
})

const viewOptions = computed(() => ['all', 'expense', 'income'].map((value) => ({
  label: $ts(`filter.view.${value}`),
  value,
})))
</script>

<template>
  <UiSelect
    v-model="viewModel"
    :options="viewOptions"
    :placeholder="$ts('filter.view.placeholder')"
  />
</template>
