<script setup lang="ts">
import { LazySnapshotDialog } from '#components'
import { useSnapshotsQuery } from '~/composables/queries/snapshots'

definePageMeta({
  layout: false,
})

const { state, isLoading } = useSnapshotsQuery()

const { register } = useDialog()
const { open: openSnapshotModal } = register(LazySnapshotDialog)

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
