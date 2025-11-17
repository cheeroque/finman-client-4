<script setup lang="ts">
import SvgLogo from '~/assets/images/logo.svg'
</script>

<template>
  <SvgLogo />
</template>

<style lang="css" scoped>
:deep(.logo-icon) {
  fill: var(--c-primary);
}

:deep(.logo-caption) {
  fill: var(--c-text);
}
</style>
