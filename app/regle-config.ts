import { defineRegleNuxtPlugin } from '@regle/nuxt/setup'
import { defineRegleConfig } from '@regle/core'
import { email, minLength, minValue, required, withMessage } from '@regle/rules'

export default defineRegleNuxtPlugin(() => {
  return defineRegleConfig({
    rules: () => {
      const { $ts } = useI18n()

      return {
        email: withMessage(email, $ts('validation.email')),
        minLength: withMessage(minLength, ({ $params: [length] }) => $ts('validation.minLength', { length })),
        minValue: withMessage(minValue, ({ $params: [min] }) => $ts('validation.minValue', { min })),
        required: withMessage(required, $ts('validation.required')),
      }
    },
  })
})
