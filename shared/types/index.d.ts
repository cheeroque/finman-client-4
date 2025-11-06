declare module '#app' {
  interface PageMeta {
    // Defines if page should be skipped by global auth middleware
    isPublic?: boolean
  }
}

export {}
