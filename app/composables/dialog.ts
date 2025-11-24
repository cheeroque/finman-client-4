import type { Component } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

interface DialogState<T extends Component> {
  component?: T
  id: symbol
  isOpen: boolean
  originalProps?: ComponentProps<T>
  props?: ComponentProps<T>
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
      close: () => close(dialogState.id),
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

    return dialog
  }

  function close(id: symbol) {
    const dialog = getDialog(id)

    dialog.isOpen = false
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
