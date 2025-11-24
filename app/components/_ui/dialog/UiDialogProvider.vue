<script setup lang="ts">
const { dialogs } = useDialog()
</script>

<template>
  <component
    :is="dialog.component"
    v-for="dialog in dialogs"
    :key="dialog.id"
    v-model:open="dialog.isOpen"
    v-bind="dialog.props"
  />
</template>
