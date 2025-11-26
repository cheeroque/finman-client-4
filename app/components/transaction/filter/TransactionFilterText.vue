<script setup lang="ts">
defineProps<{
  icon?: string
}>()

const { inputDebounce } = useAppConfig()

const { filter } = useTransactionsQueryParams()

const modelValue = ref(filter.value)

watch(filter, (value) => {
  modelValue.value = value
})

const handleUpdateFilter = useDebounceFn((value?: string) => {
  filter.value = value
}, inputDebounce)

const inputRef = useTemplateRef('inputRef')

defineExpose({ inputRef })
</script>

<template>
  <UiInput
    ref="inputRef"
    v-model="modelValue"
    :icon
    :placeholder="$ts('filter.text.placeholder')"
    class="flex-auto"
    @update:model-value="handleUpdateFilter"
  />
</template>
