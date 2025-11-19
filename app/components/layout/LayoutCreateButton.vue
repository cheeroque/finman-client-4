<script setup lang="ts">
defineProps<{
  caption: string
}>()

defineEmits<{
  click: [MouseEvent]
}>()
</script>

<template>
  <div>
    <UiButton
      variant="primary-light"
      class="max-lg:hidden"
      @click="$emit('click', $event)"
    >
      {{ $ts('createTransaction') }}
    </UiButton>

    <UiButton
      variant="success"
      class="
        fixed! right-4 bottom-22 z-30 size-16 rounded-full! shadow
        lg:hidden
      "
      @click="$emit('click', $event)"
    >
      <Icon
        name="mingcute:add-line"
        class="text-[2rem]"
      />
    </UiButton>
  </div>
</template>
