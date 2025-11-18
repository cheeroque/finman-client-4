<script setup lang="ts">
const {
  error,
  id,
} = defineProps<{
  error?: string | string[] | boolean
  id?: string
  label?: string
}>()

const controlId = computed(() => id ?? useId())

const hasError = computed(() => Array.isArray(error) ? !!error.length : !!error)

const displayError = computed(() => Array.isArray(error) && error.length
  ? error.join('. ')
  : error
)
</script>

<template>
  <div class="relative flex flex-col gap-2">
    <label
      v-if="label"
      :for="controlId"
      class="text-sm"
    >
      {{ label }}
    </label>

    <slot
      :control-id
      :has-error
    />

    <span
      v-if="hasError"
      class="absolute top-full mt-0.5 truncate text-xs text-(--c-error)"
    >
      {{ displayError }}
    </span>
  </div>
</template>
