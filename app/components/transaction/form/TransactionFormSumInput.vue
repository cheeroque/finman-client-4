<script setup lang="ts">
defineProps<{
  disabled?: boolean
  hasError?: boolean
}>()

const modelValue = defineModel<number>()

const isSubmittable = ref(false)

function handleBlur(event: FocusEvent) {
  if (!(event.target instanceof HTMLInputElement)) {
    return
  }

  calculate(event.target)
}

// Move caret to the end on input focus
function handleFocus(event: FocusEvent) {
  isSubmittable.value = false

  const target = event.target
  if (!(target instanceof HTMLInputElement)) return

  if (target.selectionEnd) {
    setTimeout(() => {
      target.setSelectionRange(target.selectionEnd, target.selectionEnd)
    }, 0)
  }
}

function handleKeydown(event: KeyboardEvent) {
  const target = event.target

  if (!(target instanceof HTMLInputElement)) {
    return
  }

  if (
    !event.key.match(/^[\d+-]$/) // NOT number/plus/minus key
    && (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) // Single letter & with no modifier
  ) {
    event.preventDefault()
  }

  if (event.key !== 'Enter') {
    isSubmittable.value = false
  }

  // First time Enter pressed inside textfield, prevent default (form submit)
  // and run calculate()
  if (event.key === 'Enter' && !isSubmittable.value) {
    event.preventDefault()
    calculate(target)
  }
}

// Calculate sum of all numbers in field
// '123' => 123
// '100+500' => 600
// '300 - 15' => 285
// '1000+250 - 100' => 1150
function calculate(target: HTMLInputElement) {
  const matches = target.value.match(/([+-]{0,}\d{1,})/gi) || []

  const total = matches.reduce((total, match) => {
    total += Number(match)
    return total
  }, 0)

  updateValue(total)

  isSubmittable.value = true
}

const inputRef = useTemplateRef('inputRef')

function updateValue(newValue: number) {
  const isChanged = modelValue.value !== newValue
  modelValue.value = newValue

  // Force redraw if model was not changed after calculate() call
  if (!isChanged && inputRef.value?.inputRef) {
    inputRef.value.inputRef.value = String(newValue)
  }
}
</script>

<template>
  <UiInput
    ref="inputRef"
    :disabled
    :has-error
    :model-value
    :placeholder="$ts('transactionForm.sum.placeholder')"
    @blur="handleBlur"
    @focus="handleFocus"
    @keydown="handleKeydown"
  />
</template>
