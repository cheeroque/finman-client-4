<script setup lang="ts">
const modelValue = defineModel<boolean>()
</script>

<template>
  <UiDrawer v-model="modelValue">
    <TransactionTableFilter />
  </UiDrawer>
</template>
