<script setup lang="ts">
const modelValue = defineModel<boolean>()

const { $localePath } = useI18n()

const filter = ref('')

function handleSubmit() {
  modelValue.value = false

  return navigateTo({
    path: $localePath('/'),
    query: {
      filter: filter.value,
    },
  })
}

const inputRef = useTemplateRef('inputRef')

whenever(inputRef, (value) => {
  nextTick(() => value.inputRef?.focus())
})
</script>

<template>
  <UiDrawer v-model="modelValue">
    <form
      class="
        flex gap-3 rounded-t-xl bg-primary-200 p-3
        dark:bg-primary-950
      "
      @submit.prevent="handleSubmit"
    >
      <UiInput
        ref="inputRef"
        v-model="filter"
        :placeholder="$ts('filter.text.placeholder')"
        class="flex-auto"
      />

      <UiButton
        type="submit"
        class="px-3"
      >
        <Icon
          name="mynaui:search"
          class="text-2xl"
        />
      </UiButton>
    </form>
  </UiDrawer>
</template>
