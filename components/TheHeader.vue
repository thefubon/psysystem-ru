<template>
  <header class="sticky top-0 z-10 backdrop-blur-2xl bg-white/90 dark:bg-black/50">
    <div class="container flex h-16 md:h-20 items-center justify-between font-medium">
      <div>
        <a class="inline-block" href="https://fubon.ru">
          <h1 class="sr-only">Fubon</h1>
          <img class="h-[28px] w-[113px] min-w-fit logo-dark" src="/img/logo-white.svg" alt="Fubon" width="113" height="28" aria-hidden="true" />
          <img class="h-[28px] w-[113px] min-w-fit logo-white" src="/img/logo-dark.svg" alt="Fubon" width="113" height="28" aria-hidden="true" />
        </a>
      </div>

      <div class="flex items-center gap-10">
        <div class="flex items-center gap-3 text-sm text-gray-300">
          <a class="hover:text-black block dark:hover:text-primary duration-150" href="https://vk.com/thefubon" target="_blank"><Icon name="mdi:vk" size="24"/></a>
          <a class="hover:text-black block dark:hover:text-primary duration-150" href="https://www.instagram.com/thefubon/" target="_blank"><Icon name="ph:instagram-logo-bold" size="24"/></a>
        </div>

        <AppColorMode/>
      </div>
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