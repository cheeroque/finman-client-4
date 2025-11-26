<script setup lang="ts">
import type { LayoutNavItem } from '~/components/layout'

const { hideHome } = defineProps<{
  hideHome?: boolean
}>()

const { $localePath, $ts } = useI18n()

const { formatDate, formatNumber } = useLocaleFormatter()
const { data } = useLatestSnapshot()

const snapshotLabel = computed(() => {
  if (!data.value?.balance) {
    return {
      primary: $ts('mainMenu.snapshots'),
    }
  }

  const { balance, created_at } = data.value

  return {
    primary: formatNumber(balance),
    secondary: formatDate(created_at, {
      dateStyle: 'short',
    }),
  }
})

const route = useRoute()

const menuItems = computed<LayoutNavItem[]>(() => [
  {
    label: $ts('mainMenu.home'),
    icon: 'mingcute:home-7-line',
    iconActive: 'mingcute:home-7-fill',
    to: $localePath('/'),
    isActive: route.fullPath === '/',
  },
  {
    label: $ts('mainMenu.categories'),
    icon: 'mingcute:layers-line',
    iconActive: 'mingcute:layers-fill',
    to: $localePath('/categories'),
    isActive: route.name === 'categories',
  },
  {
    label: $ts('mainMenu.months'),
    icon: 'mingcute:calendar-3-line',
    iconActive: 'mingcute:calendar-3-fill',
    to: $localePath('/months'),
    isActive: route.name === 'months',
  },
  {
    label: snapshotLabel.value.primary,
    labelSecondary: snapshotLabel.value.secondary,
    icon: 'mingcute:history-anticlockwise-line',
    iconActive: 'mingcute:history-anticlockwise-fill',
    to: $localePath('/snapshots'),
    isActive: route.name === 'snapshots',
  },
  {
    label: $ts('mainMenu.export'),
    icon: 'mingcute:folder-download-line',
    iconActive: 'mingcute:folder-download-line',
    onClick: exportFile,
  },
])

const visibleMenuItems = computed(() => hideHome ? menuItems.value.slice(1) : menuItems.value)

async function exportFile() {
  const url = await useRequestFetch()('/api/transactions/export')
  downloadFileByUrl(url)
}
</script>

<template>
  <ul class="flex list-none flex-col">
    <li
      v-for="item in visibleMenuItems"
      :key="item.label"
    >
      <LayoutNavItem v-bind="item" />
    </li>
  </ul>
</template>
