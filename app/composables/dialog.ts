import type { Component } from 'vue'
import type { ComponentEmit, ComponentProps } from 'vue-component-type-helpers'

type CloseEventArgType<T> = T extends { (event: 'close', arg: infer Arg): void } ? Arg : never

interface DialogState<T extends Component> {
  component?: T
  id: symbol
  isOpen: boolean
  originalProps?: ComponentProps<T>
  props?: ComponentProps<T>
  resolvePromise?: (value: CloseEventArgType<ComponentEmit<T>>) => void
}

function _useDialog() {
  const dialogs = shallowReactive<Array<DialogState<Component>>>([])

  function register<T extends Component>(component: T, _props?: ComponentProps<T>) {
    const props = _props ? { ..._props } : undefined

    const dialogState = reactive({
      component: markRaw(component) as Component,
      id: Symbol(import.meta.dev ? 'useDialog' : ''),
      isOpen: false,
      originalProps: props ?? {},
      props,
    })

    dialogs.push(dialogState)

    return {
      ...dialogState,
      open: (newProps?: ComponentProps<T>) => open(dialogState.id, newProps),
      close: (value: unknown) => close(dialogState.id, value),
      patch: (newProps: ComponentProps<T>) => patch(dialogState.id, newProps),
    }
  }

  function open<T extends Component>(id: symbol, props?: ComponentProps<T>) {
    const dialog = getDialog(id)

    if (props) {
      dialog.props = { ...dialog.originalProps, ...props }
    } else {
      dialog.props = { ...dialog.originalProps }
    }

    dialog.isOpen = true

    const result = new Promise<CloseEventArgType<ComponentEmit<T>>>((resolve) => dialog.resolvePromise = resolve)

    return Object.assign(result, {
      id,
      isOpen: dialog.isOpen,
      result,
    })
  }

  function close(id: symbol, value?: unknown) {
    const dialog = getDialog(id)

    dialog.isOpen = false

    if (dialog.resolvePromise) {
      dialog.resolvePromise(value)
      dialog.resolvePromise = undefined
    }
  }

  function closeAll() {
    dialogs.forEach((dialog) => close(dialog.id))
  }

  function patch<T extends Component>(id: symbol, props: Partial<ComponentProps<T>>) {
    const dialog = getDialog(id)
    dialog.props = { ...dialog.props, ...props }
  }

  function getDialog(id: symbol) {
    const dialog = dialogs.find((_dialog) => _dialog.id === id)

    if (!dialog) {
      throw new Error('Overlay not found')
    }

    return dialog
  }

  return {
    dialogs,
    close,
    closeAll,
    open,
    patch,
    register,
  }
}

export const useDialog = createSharedComposable(_useDialog)
