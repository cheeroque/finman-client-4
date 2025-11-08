<script setup lang="ts">
import type { Snapshot } from '~~/shared/types/snapshot'

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
</script>

<template>
  <UMain as="main">
    <UContainer class="py-5">
      <UCard>
        <SnapshotTable
          :loading="isLoading"
          :snapshots="state.data?.data"
        />

        <template #footer>
          <SharedPagination
            :items-per-page="state.data?.per_page"
            :total="state.data?.total"
          />
        </template>
      </UCard>
    </UContainer>
  </UMain>
</template>
