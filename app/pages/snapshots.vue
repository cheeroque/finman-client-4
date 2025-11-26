<script setup lang="ts">
import { LazySnapshotDialog } from '#components'

definePageMeta({
  layout: false,
})

const { data, status } = await useSnapshots()
const loading = useAsyncDataLoading(status)

const { register } = useDialog()
const { open: openSnapshotModal } = register(LazySnapshotDialog)

const paginationVisible = computed(() => Number(data.value?.total) > Number(data.value?.per_page))
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
        :loading
        :snapshots="data?.data"
      />

      <UiPagination
        v-if="paginationVisible"
        :items-per-page="data?.per_page"
        :total="data?.total"
      />
    </main>
  </NuxtLayout>
</template>
