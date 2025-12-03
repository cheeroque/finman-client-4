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
      $ts('categoryForm.slug.error.invalid')
    ),
  },
  color: {
    required,
    valid: withMessage(
      regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i),
      $ts('categoryForm.color.error.invalid')
    ),
  },
  sort_order: {
    required,
    valid: withMessage(
      regex(/^\d+$/),
      $ts('categoryForm.sortOrder.error.invalid')
    ),
  },
})

function initForm() {
  const emptyForm = {
    name: undefined,
    slug: undefined,
    color: undefined,
    is_income: false,
    sort_order: 0,
  }

  if (!category) {
    return emptyForm
  }

  const { name, slug, color, is_income, sort_order } = category

  return Object.assign(emptyForm, {
    name,
    slug,
    color,
    is_income,
    sort_order,
  })
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
      :label="$ts('categoryForm.name.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.name"
        :disabled="loading"
        :has-error
        :placeholder="$ts('categoryForm.name.placeholder')"
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.slug"
      :label="$ts('categoryForm.slug.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.slug"
        :disabled="loading"
        :has-error
        :placeholder="$ts('categoryForm.slug.placeholder')"
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.color"
      :label="$ts('categoryForm.color.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.color"
        :disabled="loading"
        :has-error
        :placeholder="$ts('categoryForm.color.placeholder')"
      >
        <template #trailing-icon>
          <UiColorPicker v-model="form.color" />
        </template>
      </UiInput>
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.sort_order"
      :label="$ts('categoryForm.sortOrder.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.sort_order"
        :disabled="loading"
        :has-error
        placeholder="0"
      />
    </UiFormField>

    <UiCheckbox
      v-model="form.is_income"
      class="self-start"
    >
      {{ $ts('categoryForm.is_income.label') }}
    </UiCheckbox>
  </form>
</template>
