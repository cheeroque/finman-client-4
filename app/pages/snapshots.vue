<script setup lang="ts">
import type { Snapshot } from '~~/shared/types/snapshot'

definePageMeta({
  layout: false,
})

const page = useRouteQuery('page', '1', {
  mode: 'push',
  transform: Number,
})

const { state, isLoading } = useQuery<PaginatedResponse<Snapshot>>({
  key: () => ['snapshots', page.value],

  query: () => useRequestFetch()('/api/snapshots', {
    query: {
      page: page.value,
    },
  }),

  placeholderData: (previousData) => previousData,
})

const { open: openSnapshotModal } = useSnapshotModal()

const paginationVisible = computed(() => Number(state.value.data?.total) > Number(state.value.data?.per_page))
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <LayoutCreateButton
        :caption="$ts('createSnapshot')"
        @click="openSnapshotModal()"
      />
    </template>

    <main class="flex flex-col gap-8">
      <SnapshotTable
        :loading="isLoading"
        :snapshots="state.data?.data"
      />

      <UiPagination
        v-if="paginationVisible"
        :items-per-page="state.data?.per_page"
        :total="state.data?.total"
      />
    </main>
  </NuxtLayout>
</template>
