<template>
  <NuxtLayout>
    <UApp>
      <NuxtLoadingIndicator
        :height="2"
        :throttle="0"
      />

      <NuxtRouteAnnouncer />

      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
