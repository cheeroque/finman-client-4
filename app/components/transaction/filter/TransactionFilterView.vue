<script setup lang="ts">
const { $ts } = useI18n()

const { currentView } = useQueryParams()

const viewModel = computed({
  get: () => currentView.value ?? 'all',
  set: (value) => {
    currentView.value = value === 'all' ? undefined : value
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
