<script setup lang="ts">
const { $localePath } = useI18n()

const { formatNumber } = useLocaleFormatter()

const { data: balance } = useBalance()
const title = computed(() => formatNumber(balance.value ?? 0))

const { data: total } = useCurrentMonthTotal()
const totalExpenses = computed(() => total.value?.expenses && formatNumber(total.value.expenses))
const totalIncomes = computed(() => total.value?.incomes && formatNumber(total.value.incomes))
</script>

<template>
  <header
    class="
      flex flex-col items-center border-b border-primary-100 px-8 pt-2 pb-4
      lg:flex-row lg:pt-0 lg:pb-8
      dark:border-primary-990
    "
  >
    <div class="flex flex-auto items-baseline gap-5">
      <NuxtLink
        :to="$localePath('/')"
        class="
          inline-flex transition-colors
          hover:text-primary-600
          dark:hover:text-primary-500
        "
      >
        <h1
          class="
            text-3xl font-medium
            max-lg:text-center
            lg:text-5xl
          "
        >
          {{ title }}
        </h1>
      </NuxtLink>

      <div
        class="
          flex translate-y-0.5 items-baseline gap-5 text-2xl
          max-2xl:hidden
        "
      >
        <span
          v-if="totalIncomes"
          class="
            flex items-center gap-1 text-neutral-500
            dark:text-neutral-400
          "
        >
          <Icon
            name="mynaui:arrow-up-right-solid"
            class="
              text-lime-500
              dark:text-lime-600
            "
          />
          {{ totalIncomes }}
        </span>

        <span
          v-if="totalExpenses"
          class="
            flex items-center gap-1 text-neutral-500
            dark:text-neutral-400
          "
        >
          <Icon
            name="mynaui:arrow-down-right-solid"
            class="
              text-rose-500
              dark:text-rose-600
            "
          />
          {{ totalExpenses }}
        </span>
      </div>
    </div>

    <div class="flex-none">
      <slot />
    </div>
  </header>
</template>
