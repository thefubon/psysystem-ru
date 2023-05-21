<template>
  <header class="sticky top-0 z-10 backdrop-blur-xl bg-white/75 dark:backdrop-blur-xl dark:bg-black/50">
    <div class="container flex h-16 md:h-20 items-center justify-between font-medium">
      <div>
        <a class="inline-block" href="/">
          <h1 class="sr-only">PsySystem Records</h1>
          <img class="h-[28px] w-[113px] min-w-fit logo-dark" src="/img/logo-white.svg" alt="Fubon" width="113" height="28" aria-hidden="true" />
          <img class="h-[28px] w-[113px] min-w-fit logo-white" src="/img/logo-dark.svg" alt="Fubon" width="113" height="28" aria-hidden="true" />
        </a>
      </div>

      <AppColorMode/>
    </div>
  </header>
</template>


<style scoped>
.light img.logo-dark {
  @apply hidden;
}

.dark img.logo-white {
  @apply hidden;
}
</style>