// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Fubon',
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: 'PsySystem — Российский лейбл звукозаписи' },
        { name: 'keywords', content: 'psysystem, music, fubon, thefubon, yagelproject, psytrace, trance, progressive, house, chillout, deep' },
        { name: 'author', content: 'Fubon' },
        { name: 'copyright', content: 'Fubon' },
        { name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0' },
        { name: 'HandheldFriendly', content: 'True' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'application-name', content: 'PsySystem' },
        { name: 'msapplication-tooltip', content: 'PsySystem — Российский лейбл звукозаписи' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'format-detection', content: 'address=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-startup-image', href: '/startup.png' },
        { rel: 'apple-touch-icon', href: '/touch-icon-iphone.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/touch-icon-ipad.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/touch-icon-iphone-retina.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/touch-icon-ipad-retina.png' },
      ],
      bodyAttrs: {
        class: 'antialiased dark:bg-black'
      },
      script: [
        { src: '/js/liveinternet.js' }
      ],
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    'nuxt-icon',
    '@nuxtjs/color-mode',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/drjdwwxf7/image/upload/v1667079274/',
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },

  colorMode: {
    classSuffix: '',
    fallback: 'system',
    storageKey: 'color-mode',
  },
})
