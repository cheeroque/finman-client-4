<script setup lang="ts">
import * as z from 'zod'

import type { Category } from '~~/shared/types/category'

const { category } = defineProps<{
  loading?: boolean
  category?: Category
}>()

defineEmits<{
  submit: [Partial<Category>]
}>()

const { $ts } = useI18n()

const schema = z.object({
  name: z.string($ts('categoryModal.form.name.error.invalid'))
    .min(1, $ts('categoryModal.form.name.error.invalid')),
  slug: z.string($ts('categoryModal.form.slug.error.required'))
    .min(1, $ts('categoryModal.form.slug.error.required'))
    .regex(/^[a-z0-9_-]+$/, $ts('categoryModal.form.slug.error.invalid')),
  color: z.string($ts('categoryModal.form.color.error.required'))
    .min(1, $ts('categoryModal.form.color.error.required'))
    .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, $ts('categoryModal.form.color.error.invalid')),
  is_income: z.boolean(),
})

type Schema = z.output<typeof schema>

const state = ref<Partial<Schema>>(initForm())

whenever(() => category, () => {
  state.value = initForm()
})

function initForm() {
  const emptyForm: Partial<Schema> = {
    name: undefined,
    slug: undefined,
    color: undefined,
    is_income: false,
  }

  if (!category) {
    return emptyForm
  }

  const { name, slug, color, is_income } = category

  return Object.assign(emptyForm, { name, slug, color, is_income })
}
</script>

<template>
  <UForm
    v-bind="{ schema, state }"
    :disabled="loading"
    class="flex flex-col gap-4"
    @submit="$emit('submit', $event.data)"
  >
    <UFormField
      :label="$ts('categoryModal.form.name.label')"
      name="name"
    >
      <UInput
        v-model="state.name"
        :placeholder="$ts('categoryModal.form.name.placeholder')"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$ts('categoryModal.form.slug.label')"
      name="slug"
    >
      <UInput
        v-model="state.slug"
        :placeholder="$ts('categoryModal.form.slug.placeholder')"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$ts('categoryModal.form.color.label')"
      name="color"
    >
      <UInput
        v-model="state.color"
        :placeholder="$ts('categoryModal.form.color.placeholder')"
        class="w-full"
      >
        <template #trailing>
          <SharedColorPicker v-model="state.color" />
        </template>
      </UInput>
    </UFormField>

    <UCheckbox
      v-model="state.is_income"
      :label="$ts('categoryModal.form.is_income.label')"
    />
  </UForm>
</template>
