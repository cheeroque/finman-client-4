<template>
  <aside
    class="
      flex flex-col gap-8 self-start overflow-y-auto rounded-[1.25rem] border
      border-(--c-outline-primary-light) bg-(--c-surface-bg) px-8 py-7
    "
  >
    <WidgetMonthlyExpenses />

    <hr class="border-(--c-outline-primary-light)">

    <WidgetMonthSelector />
  </aside>
</template>
