import clsx from 'clsx'
import type { ClassValue } from 'vue'
import { twMerge } from 'tailwind-merge'

export function mergeClasses(...args: Array<ClassValue | undefined | null>) {
  return twMerge(clsx(...args))
}
