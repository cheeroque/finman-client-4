<script setup lang="ts">
import type { RegleExternalErrorTree } from '@regle/core'
import { email, minLength, required } from '@regle/rules'
import { FetchError } from 'ofetch'

const { $localePath, $ts } = useI18n()

const form = ref({
  email: '',
  password: '',
})

const externalErrors = ref<RegleExternalErrorTree<typeof form>>({})

const { r$ } = useRegle(form, {
  email: {
    email,
    required,
  },
  password: {
    minLength: minLength(8),
    required,
  },
}, { externalErrors })

const isLoading = ref(false)

async function handleSubmit() {
  const { data, valid } = await r$.$validate()

  if (!valid) {
    return
  }

  isLoading.value = true

  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: data,
    })

    return navigateTo($localePath('/'))
  } catch (error) {
    externalErrors.value = {
      password: [getErrorMessage(error)],
    }
  } finally {
    isLoading.value = false
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof FetchError && error.statusCode === 401) {
    return $ts('error.invalidCredentials')
  }

  return $ts('error.default')
}
</script>

<template>
  <form
    class="flex flex-col gap-6"
    @submit.prevent="handleSubmit()"
  >
    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.email"
      :label="$ts('email.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.email"
        :disabled="isLoading"
        :has-error
        :placeholder="$ts('email.placeholder')"
        type="email"
      />
    </UiFormField>

    <UiFormField
      v-slot="{ controlId, hasError }"
      :error="r$.$errors.password"
      :label="$ts('password.label')"
    >
      <UiInput
        :id="controlId"
        v-model="form.password"
        :disabled="isLoading"
        :has-error
        :placeholder="$ts('password.placeholder')"
        type="password"
      />
    </UiFormField>

    <UiButton
      :loading="isLoading"
      type="submit"
      variant="success"
      class="w-full"
    >
      {{ $ts('submit') }}
    </UiButton>
  </form>
</template>
