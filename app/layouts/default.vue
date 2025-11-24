<template>
  <div class="lg:flex lg:h-dvh lg:gap-8 lg:p-3 lg:pl-8">
    <div
      class="
        flex min-h-0 flex-none basis-60 flex-col overflow-y-auto
        max-lg:hidden
        xl:basis-80
      "
    >
      <aside class="flex flex-auto flex-col gap-3 py-5">
        <LayoutLogo class="mb-8" />

        <LayoutNav class="flex-auto gap-2" />

        <LayoutNavLogout />
      </aside>
    </div>

    <div
      class="
        flex min-h-0 flex-auto flex-col bg-(--c-content-bg) pt-3 pb-26
        lg:rounded-3xl lg:py-8 lg:shadow-sm
      "
    >
      <LayoutHeader>
        <slot name="header" />
      </LayoutHeader>

      <div
        class="
          flex min-h-0 flex-auto gap-8 overflow-y-auto
          lg:p-8
        "
      >
        <div class="min-w-0 flex-auto">
          <slot />
        </div>

        <LayoutSecondarySidebar
          class="
            flex-none basis-96
            max-xl:hidden
          "
        />
      </div>

      <LayoutBottomNav class="lg:hidden" />
    </div>
  </div>
</template>
