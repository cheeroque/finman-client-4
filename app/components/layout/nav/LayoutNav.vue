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

const menuItems = computed<LayoutNavItem[]>(() => [
  {
    label: $ts('mainMenu.home'),
    icon: 'mynaui:home-smile',
    to: $localePath('/'),
  },
  {
    label: $ts('mainMenu.categories'),
    icon: 'mynaui:grid',
    to: $localePath('/categories'),
  },
  {
    label: $ts('mainMenu.months'),
    icon: 'mynaui:calendar',
    to: $localePath('/months'),
  },
  {
    label: $ts('mainMenu.marked'),
    icon: 'mynaui:star',
    to: $localePath('/?marked=true'),
  },
  {
    label: snapshotLabel.value.primary,
    labelSecondary: snapshotLabel.value.secondary,
    icon: 'mynaui:clock-ten',
    to: $localePath('/snapshots'),
  },
])

const visibleMenuItems = computed(() => hideHome ? menuItems.value.slice(1) : menuItems.value)
</script>

<template>
  <ul class="flex list-none flex-col">
    <li
      v-for="item in visibleMenuItems"
      :key="item.label"
    >
      <LayoutNavItem v-bind="item" />
    </li>

    <li>
      <LayoutNavExport />
    </li>
  </ul>
</template>
