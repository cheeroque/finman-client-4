<template>
  <NuxtLayout>
    <NuxtLoadingIndicator
      :height="2"
      :throttle="0"
    />

    <NuxtRouteAnnouncer />

    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
