<template>
  <NuxtLayout>
    <NuxtPage />

    <div class="fixed bottom-0 left-0 z-50 rounded-tr-xl bg-white">
      <div class="size-item flex xs:hidden">
        <span>Full</span>
      </div>

      <div class="size-item hidden xs:flex sm:hidden">
        <span>XS</span>
      </div>

      <div class="size-item hidden sm:flex md:hidden">
        <span>SM</span>
      </div>

      <div class="size-item hidden md:flex lg:hidden">
        <span>MD</span>
      </div>

      <div class="size-item hidden lg:flex xl:hidden">
        <span>LG</span>
      </div>

      <div class="size-item 2xl:hidden hidden xl:flex">
        <span>XL</span>
      </div>

      <div class="2xl:flex size-item hidden">
        <span>2XL</span>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.size-item  {
  @apply h-2.5 px-0.5 items-center justify-center text-[8px] font-bold text-slate-400;
}
</style>