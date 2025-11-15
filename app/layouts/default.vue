<template>
  <div
    class="
      bg-(--c-bg-app) text-(--c-text)
      lg:flex lg:h-dvh lg:gap-8 lg:p-3 lg:pl-8
    "
  >
    <div
      class="
        min-h-0 flex-none basis-80 overflow-y-auto
        max-lg:hidden
      "
    >
      <LayoutPrimarySidebar />
    </div>

    <div
      class="
        flex min-h-0 flex-auto flex-col bg-(--c-bg-content) pt-3 pb-18
        lg:rounded-3xl lg:py-8 lg:shadow-sm
      "
    >
      <LayoutHeader>
        <slot name="header" />
      </LayoutHeader>

      <div
        class="
          flex min-h-0 flex-auto gap-8 overflow-y-auto
          lg:px-8
        "
      >
        <div class="min-w-0 flex-auto">
          <slot />
        </div>

        <LayoutSecondarySidebar
          class="
            basis-96
            max-lg:hidden
          "
        />
      </div>
    </div>
  </div>
</template>
