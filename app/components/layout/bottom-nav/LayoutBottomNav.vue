<script setup lang="ts">
const route = useRoute()

const isHomeActive = computed(() => route.fullPath === '/')
const isExpensesActive = computed(() => route.name === 'index' && route.query.view === 'expense')
const isIncomesActive = computed(() => route.name === 'index' && route.query.view === 'income')

const { $localeRoute, $ts } = useI18n()

const expensesRoute = computed(() => $localeRoute(getViewRoute('expense')))
const incomesRoute = computed(() => $localeRoute(getViewRoute('income')))

const isDrawerOpen = ref(false)
const isSearchActive = ref(false)

function toggleSearch() {
  isDrawerOpen.value = false
  isSearchActive.value = !isSearchActive.value
}

function toggleDrawer() {
  isSearchActive.value = false
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>

<template>
  <div
    class="
      fixed inset-x-0 bottom-0 z-100 flex items-start gap-8 bg-(--c-bg-app) p-3
      pb-3.5
    "
  >
    <LayoutDrawerToggle
      :active="isDrawerOpen"
      @click="toggleDrawer()"
    />

    <div class="flex flex-auto justify-between">
      <LayoutBottomNavItem
        :active="isHomeActive"
        icon="mingcute:home-7-line"
        :to="$localeRoute({ name: 'index' })"
      >
        {{ $ts('bottomNav.home') }}
      </LayoutBottomNavItem>

      <LayoutBottomNavItem
        :active="isIncomesActive"
        icon="mingcute:wallet-3-line"
        :to="incomesRoute"
      >
        {{ $ts('bottomNav.incomes') }}
      </LayoutBottomNavItem>

      <LayoutBottomNavItem
        :active="isExpensesActive"
        icon="mingcute:shopping-cart-1-line"
        :to="expensesRoute"
      >
        {{ $ts('bottomNav.expenses') }}
      </LayoutBottomNavItem>

      <LayoutBottomNavItem
        :active="isSearchActive"
        icon="mingcute:search-line"
        @click="toggleSearch()"
      >
        {{ $ts('bottomNav.search') }}
      </LayoutBottomNavItem>
    </div>

    <LayoutDrawer v-model="isDrawerOpen" />
  </div>
</template>
