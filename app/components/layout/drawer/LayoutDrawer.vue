<script setup lang="ts">
const modelValue = defineModel<boolean>()
</script>

<template>
  <UiDrawer v-model="modelValue">
    <div
      class="
        flex flex-col gap-3 rounded-t-xl bg-primary-200 p-3
        dark:bg-primary-950
      "
    >
      <LayoutNavLogout />

      <hr
        class="
          border-primary-300/50
          dark:border-primary-900
        "
      >

      <LayoutNav
        hide-home
        class="
          gap-1 border-b border-primary-300/50 pb-3
          dark:border-primary-900
        "
      />
    </div>
  </UiDrawer>
</template>
