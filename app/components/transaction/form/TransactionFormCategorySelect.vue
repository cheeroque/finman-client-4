<script setup lang="ts">
import { useCategoriesQuery } from '~/composables/queries/categories'

const modelValue = defineModel<number>()

const { state, isLoading } = useCategoriesQuery()

const items = computed(() => state.value.data?.map(({ id, name }) => ({
  label: name,
  value: id,
})))

whenever(items, (newItems) => {
  modelValue.value ??= newItems[0]?.value
})
</script>

<template>
  <USelect
    v-model="modelValue"
    :disabled="isLoading"
    :items
  />
</template>
