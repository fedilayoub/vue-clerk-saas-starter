<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar/utils'

const { state } = useSidebar()
</script>

<template>
    <div class="flex items-center py-2" :class="state === 'expanded' ? 'gap-0' : 'justify-center'">
      <img src="/logo/logo_dark.svg" class="hidden dark:block" alt="Vue SaaS starter logo" :class="state === 'expanded' ? 'size-5' : 'size-4'" />
      <img src="/logo/logo_light.svg" class="block dark:hidden" alt="Vue SaaS starter logo" :class="state === 'expanded' ? 'size-5' : 'size-4'" />
      <p class="text-black dark:text-white font-semibold text-sm">{{ state === 'expanded' ? 'tarter' : '' }}</p>
    </div>
</template> 