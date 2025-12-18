<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-vue-next'
import MainLayout from '@/layouts/MainLayout.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <MainLayout>
    <section :class="cn(
      'relative flex h-[35rem] lg:h-[45rem] w-full items-center justify-center',
      'bg-white dark:bg-black'
    )">
    
      <!-- Grid background pattern -->
      <div :class="cn(
        'absolute inset-0',
        '[background-size:40px_40px]',
        '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
        'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
      )" />

      <!-- Radial gradient overlay -->
      <div class="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      <!-- Content -->
      <div class="relative container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div class="mx-auto mt-5 max-w-2xl text-center">
          <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
            {{ t('home.hero.title') }}
          </h1>
        </div>

        <div class="mx-auto mt-5 max-w-3xl text-center">
          <p class="text-muted-foreground text-xl">
            {{ t('home.hero.description') }}
          </p>
        </div>

        <!-- CTA Button -->
        <div class="mt-8 flex justify-center gap-3">
          <router-link
            to="/sign-up"
            :class="cn(
              'group flex items-center rounded-full',
              'bg-[#42b883] px-4 py-3 text-sm font-medium text-white',
              'hover:bg-[#42b883]/90',
              'transition-all duration-300'
            )"
          >
            {{ t('home.hero.cta') }}
            <ArrowRight :class="cn(
              'ml-2 h-4 w-4',
              'transition-transform group-hover:translate-x-1'
            )" />
          </router-link>
        </div>
      </div>
    </section>
  </MainLayout>
</template>