<script setup lang="ts">
import { useTransactionsQuery } from '~/composables/queries/transactions'

const { $ts } = useI18n()

const { view } = useTransactionsQuery()

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
