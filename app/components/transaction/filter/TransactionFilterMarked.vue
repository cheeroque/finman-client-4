<script setup lang="ts">
import { useTransactionsQuery } from '~/composables/queries/transactions'

const { $ts } = useI18n()

const { marked } = useTransactionsQuery()
</script>

<template>
  <UiCheckbox v-model="marked">
    <span class="truncate">
      {{ $ts('filter.marked.label') }}
    </span>
  </UiCheckbox>
</template>
