<script setup lang="ts">
import { TimeFieldInput, TimeFieldRoot, type TimeFieldRootProps } from 'reka-ui'

const modelValue = defineModel<TimeFieldRootProps['modelValue']>()
</script>

<template>
  <TimeFieldRoot
    v-slot="{ segments }"
    v-model="modelValue"
    class="flex items-center text-center select-none"
  >
    <template
      v-for="item in segments"
      :key="item.part"
    >
      <TimeFieldInput
        v-if="item.part === 'literal'"
        :part="item.part"
      >
        {{ item.value }}
      </TimeFieldInput>

      <TimeFieldInput
        v-else
        :part="item.part"
        class="
          rounded p-0.5
          focus:outline-2 focus:outline-(--c-primary)
          data-placeholder:text-(--c-text-muted)
        "
      >
        {{ item.value }}
      </TimeFieldInput>
    </template>
  </TimeFieldRoot>
</template>
