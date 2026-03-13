<script setup lang="ts">
import { LazySnapshotDialog } from '#components'

definePageMeta({
  layout: false,
})

const route = useRoute()

const snapshotStore = useSnapshotStore()
const { snapshots, loading } = storeToRefs(snapshotStore)

await useAsyncData(
  () => snapshotStore.fetchSnapshots(),
  { watch: [() => route.query] }
)

const { register } = useDialog()
const { open: openSnapshotModal } = register(LazySnapshotDialog)

const paginationVisible = computed(
  () => Number(snapshots.value?.total) > Number(snapshots.value?.per_page)
)

useHead({
  titleTemplate: usePageTitle('snapshots.title'),
})
</script>

<template>
  <NuxtLayout name="default">
    <template #header>
      <LayoutCreateButton
        :caption="$ts('snapshots.create')"
        @click="openSnapshotModal()"
      />
    </template>

    <main
      class="
        flex flex-col gap-8
        max-lg:pb-16
      "
    >
      <SnapshotTable
        :loading
        :snapshots="snapshots?.data"
      />

      <UiPagination
        v-if="paginationVisible"
        :items-per-page="snapshots?.per_page"
        :total="snapshots?.total"
      />
    </main>
  </NuxtLayout>
</template>
