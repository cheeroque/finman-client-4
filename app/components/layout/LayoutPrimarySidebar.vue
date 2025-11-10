<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

import { useSnapshotsLatestQuery } from '~/composables/queries/snapshots-latest'

const { $localePath, $ts } = useI18n()
const { formatDate, formatNumber } = useLocaleFormatter()

const { state } = useSnapshotsLatestQuery()

const snapshotLabel = computed(() => {
  if (!state.value.data?.balance) {
    return $ts('mainMenu.snapshots')
  }

  const { balance, created_at } = state.value.data

  return [formatNumber(balance), formatDate(created_at, { dateStyle: 'short' })].join(', ')
})

const menuItems = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: $ts('mainMenu.home'),
      icon: 'solar:home-smile-linear',
      to: $localePath('/'),
    },
    {
      label: $ts('mainMenu.categories'),
      icon: 'solar:layers-minimalistic-linear',
      to: $localePath('/categories'),
    },
    {
      label: $ts('mainMenu.months'),
      icon: 'solar:calendar-mark-linear',
      to: $localePath('/months'),
    },
  ],
  [
    {
      label: snapshotLabel.value,
      icon: 'solar:refresh-circle-linear',
      to: $localePath('/snapshots'),
    },
    {
      label: $ts('mainMenu.export'),
      icon: 'solar:file-download-linear',
      onSelect: exportFile,
    },
    {
      label: $ts('mainMenu.logout'),
      icon: 'solar:exit-linear',
      onSelect: logout,
    },
  ],
])

async function exportFile() {
  const url = await useRequestFetch()('/api/transactions/export')
  downloadFileByUrl(url)
}

async function logout() {
  await useRequestFetch()('/api/logout', { method: 'POST' })

  return navigateTo('/login')
}
</script>

<template>
  <aside class="px-4 sm:px-6 lg:px-8 py-5">
    <UNavigationMenu
      :items="menuItems"
      orientation="vertical"
    />
  </aside>
</template>
