<script setup lang="ts">
import { regex, required, withMessage } from '@regle/rules'

import type { Category } from '~~/shared/types/category'

const { category } = defineProps<{
  category?: Category
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [Partial<Category>]
}>()

const { $ts } = useI18n()

const form = ref(initForm())

whenever(() => category, () => {
  form.value = initForm()
})

const { r$ } = useRegle(form, {
  name: {
    required,
  },
  slug: {
    required,
    valid: withMessage(
      regex(/^[a-z0-9_-]+$/),
      $ts('categoryModal.form.slug.error.invalid')
    ),
  },
  color: {
    required,
    valid: withMessage(
      regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i),
      $ts('categoryModal.form.color.error.invalid')
    ),
  },
})

function initForm() {
  const emptyForm = {
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

async function handleSubmit() {
  const { data, valid } = await r$.$validate()

  if (!valid) {
    return
  }

  emit('submit', data)
}
</script>

<template>
  <form
    :disabled="loading"
    class="
      flex flex-col gap-4
      lg:gap-6
    "
    @submit.prevent="handleSubmit()"
  >
    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.name"
      :label="$ts('categoryModal.form.name.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.name"
        :disabled="loading"
        :has-error
        :placeholder="$ts('categoryModal.form.name.placeholder')"
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.slug"
      :label="$ts('categoryModal.form.slug.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.slug"
        :disabled="loading"
        :has-error
        :placeholder="$ts('categoryModal.form.slug.placeholder')"
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.color"
      :label="$ts('categoryModal.form.color.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.color"
        :disabled="loading"
        :has-error
        :placeholder="$ts('categoryModal.form.color.placeholder')"
      >
        <template #trailing-icon>
          <UiColorPicker v-model="form.color" />
        </template>
      </UiInput>
    </UiFormField>

    <UiCheckbox
      v-model="form.is_income"
      class="self-start"
    >
      {{ $ts('categoryModal.form.is_income.label') }}
    </UiCheckbox>
  </form>
</template>
