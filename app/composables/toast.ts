import type { ToastProps } from '~/components/_ui/types'

function _useToast() {
  const { toastDuration } = useAppConfig()

  const toasts = shallowReactive<Array<ToastProps & { id: symbol }>>([])

  function show(props: Omit<ToastProps, 'open'>) {
    const id = Symbol(import.meta.dev ? 'useToast' : '')
    const duration = props.duration ?? toastDuration[props.variant]

    toasts.push({
      ...props,
      duration,
      id,
    })

    if (duration !== false) {
      setTimeout(() => hide(id), duration)
    }
  }

  function hide(id: symbol) {
    const index = toasts.findIndex((toast) => toast.id === id)

    if (!toasts[index]) {
      return
    }

    toasts.splice(index, 1)
  }

  return {
    toasts,
    hide,
    show,
  }
}

export const useToast = createSharedComposable(_useToast)
