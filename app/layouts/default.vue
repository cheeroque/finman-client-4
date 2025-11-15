<template>
  <div>
    <LayoutHeader>
      <slot name="header" />
    </LayoutHeader>

    <UMain
      class="
        grid max-h-[calc(100vh-var(--ui-header-height))]
        grid-cols-[320px_1fr_320px]
      "
    >
      <LayoutPrimarySidebar />

      <slot />

      <LayoutSecondarySidebar />
    </UMain>
  </div>
</template>
