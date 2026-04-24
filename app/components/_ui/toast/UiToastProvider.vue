<script setup lang="ts">
const { toasts, hide } = useToast()

const toastsWithId = computed(() => toasts.map((toast) => ({
  ...toast,
  id: String(toast.id),
  originalId: toast.id,
})))
</script>

<template>
  <div
    class="
      fixed inset-x-4 top-4 z-500 mx-auto flex w-auto max-w-90 flex-col gap-2
      lg:left-auto lg:w-90
    "
  >
    <TransitionGroup
      enter-from-class="-translate-y-[40%] opacity-0 lg:translate-x-[150%] lg:translate-y-0"
      leave-to-class="-translate-y-[40%] opacity-0 lg:translate-x-[150%] lg:translate-y-0"
    >
      <UiToast
        v-for="toast in toastsWithId"
        :key="toast.id"
        v-bind="toast"
        class="transition-all duration-500"
        @hide="hide(toast.originalId)"
      />
    </TransitionGroup>
  </div>
</template>
