<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'
import * as z from 'zod'

const { $localePath, $ts } = useI18n()

const schema = z.object({
  email: z.email($ts('email.error.invalid')),
  password: z.string($ts('password.error.invalid')).min(8, $ts('password.error.minLength', { length: 8 })),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const formRef = useTemplateRef('formRef')
const isLoading = ref(false)

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: event.data,
    })

    await navigateTo($localePath('/'))
  } catch (error) {
    formRef.value?.setErrors([{
      name: 'password',
      message: getErrorMessage(error),
    }])
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
  <UForm
    v-bind="{ schema, state }"
    ref="formRef"
    class="flex flex-col gap-4"
    @submit="handleSubmit"
  >
    <UFormField
      :label="$ts('email.label')"
      name="email"
    >
      <UInput
        v-model="state.email"
        :placeholder="$ts('email.placeholder')"
        type="email"
      />
    </UFormField>

    <UFormField
      :label="$ts('password.label')"
      name="password"
    >
      <UInput
        v-model="state.password"
        :placeholder="$ts('password.placeholder')"
        type="password"
      />
    </UFormField>

    <UButton
      type="submit"
      class="mx-auto"
    >
      {{ $ts('submit') }}
    </UButton>
  </UForm>
</template>
