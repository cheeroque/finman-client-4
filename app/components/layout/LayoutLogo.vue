<script setup lang="ts">
import SvgLogo from '~/assets/images/logo.svg'

const { $localePath } = useI18n()
</script>

<template>
  <NuxtLink
    :to="$localePath('/')"
    external
    class="
      [--color-caption:var(--color-neutral-900)]
      [--color-icon:var(--color-primary-600)]
      dark:[--color-caption:var(--color-white)]
      dark:[--color-icon:var(--color-primary-500)]
    "
  >
    <SvgLogo />
  </NuxtLink>
</template>

<style lang="css" scoped>
:deep(.logo-icon) {
  fill: var(--color-icon);
}

:deep(.logo-caption) {
  fill: var(--color-caption);
}
</style>
