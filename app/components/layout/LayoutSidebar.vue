<template>
  <aside
    class="
      flex flex-col gap-8 self-start overflow-y-auto rounded-2xl border
      border-primary-100 bg-primary-50 px-8 py-7
      dark:border-primary-950 dark:bg-primary-990
    "
  >
    <WidgetMonthlyExpenses />

    <hr
      class="
        border-primary-100
        dark:border-primary-950
      "
    >

    <WidgetMonthSelector />
  </aside>
</template>
