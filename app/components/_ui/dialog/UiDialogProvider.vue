<script setup lang="ts">
const { dialogs, close } = useDialog()
</script>

<template>
  <component
    :is="dialog.component"
    v-for="dialog in dialogs"
    :key="dialog.id"
    v-model:open="dialog.isOpen"
    v-bind="dialog.props"
    @close="close(dialog.id, $event)"
  />
</template>
