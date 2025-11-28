<script setup lang="ts">
defineProps<{
  icon?: string
  placeholder?: string
}>()

const { inputDebounce } = useAppConfig()

const { filter } = useTransactionsParams()

const modelValue = ref(filter.value)

watch(filter, (value) => {
  modelValue.value = value
})

const handleUpdateFilter = useDebounceFn((value?: string) => {
  filter.value = value
}, inputDebounce)

const inputRef = useTemplateRef('inputRef')

defineExpose({ inputRef })

useEventListener('keydown', (event) => {
  if (event.code === 'KeyK' && event.ctrlKey) {
    event.preventDefault()
    inputRef.value?.inputRef?.focus()
  }
})
</script>

<template>
  <UiInput
    ref="inputRef"
    v-model="modelValue"
    :icon
    :placeholder="placeholder ?? $ts('filter.text.placeholderHotkey')"
    class="flex-auto"
    @update:model-value="handleUpdateFilter"
  />
</template>
