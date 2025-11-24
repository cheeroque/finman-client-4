<script setup lang="ts">
import SvgLogo from '~/assets/images/logo.svg'

const { $localePath } = useI18n()
</script>

<template>
  <NuxtLink
    :to="$localePath('/')"
    external
  >
    <SvgLogo />
  </NuxtLink>
</template>

<style lang="css" scoped>
:deep(.logo-icon) {
  fill: var(--c-primary);
}

:deep(.logo-caption) {
  fill: var(--c-text);
}
</style>
