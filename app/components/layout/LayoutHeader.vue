<script setup lang="ts">
const { $localePath } = useI18n()
const { formatNumber } = useLocaleFormatter()

const balanceStore = useBalanceStore()
const { balance } = storeToRefs(balanceStore)

const transactionStore = useTransactionStore()
const { currentMonthTotal: total } = storeToRefs(transactionStore)

const { status } = useLazyAsyncData(
  'header-balance',

  () => Promise.all([
    balanceStore.fetchBalance(true),
    transactionStore.fetchCurrentMonthTotal(),
  ]),

  {
    getCachedData: (key, nuxtApp, ctx) => {
      if (['refresh:hook', 'refresh:manual'].includes(ctx.cause)) {
        return
      }

      return nuxtApp.payload.data[key]
    },
    server: false,
  }
)

const loading = useAsyncDataLoading(status)

const title = computed(() => formatNumber(balance.value ?? 0))
const totalExpenses = computed(() => formatNumber(total.value?.expenses ?? 0))
const totalIncomes = computed(() => formatNumber(total.value?.incomes ?? 0))
</script>

<template>
  <header
    class="
      flex flex-col items-center border-b border-primary-100 px-8 pt-2 pb-4
      lg:flex-row lg:pt-0 lg:pb-8
      dark:border-primary-990
    "
  >
    <div class="flex flex-auto items-end gap-5">
      <UiSkeleton
        :loading
        class="
          h-9 w-45
          lg:h-12 lg:w-70
        "
      >
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
      </UiSkeleton>

      <div
        class="
          flex translate-y-px items-end gap-5 text-2xl
          max-2xl:hidden
        "
      >
        <UiSkeleton
          :loading
          class="h-8 w-35"
        >
          <span
            class="
              flex items-center gap-1 text-neutral-500
              dark:text-neutral-400
            "
          >
            <Icon
              name="mynaui:arrow-up-right-solid"
              class="
                size-6 text-lime-500
                dark:text-lime-600
              "
            />
            {{ totalIncomes }}
          </span>
        </UiSkeleton>

        <UiSkeleton
          :loading
          class="h-8 w-35"
        >
          <span
            class="
              flex items-center gap-1 text-neutral-500
              dark:text-neutral-400
            "
          >
            <Icon
              name="mynaui:arrow-down-right-solid"
              class="
                size-6 text-rose-500
                dark:text-rose-600
              "
            />
            {{ totalExpenses }}
          </span>
        </UiSkeleton>
      </div>
    </div>

    <div class="flex-none">
      <slot />
    </div>
  </header>
</template>
