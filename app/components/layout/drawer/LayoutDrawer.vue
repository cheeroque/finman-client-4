<script setup lang="ts">
const modelValue = defineModel<boolean>()
</script>

<template>
  <UiDrawer v-model="modelValue">
    <div class="flex flex-col gap-3 p-3">
      <LayoutNavLogout />

      <hr class="border-(--c-outline-primary)">

      <LayoutNav
        hide-home
        class="gap-1 border-b border-(--c-outline-primary) pb-3"
      />
    </div>
  </UiDrawer>
</template>
