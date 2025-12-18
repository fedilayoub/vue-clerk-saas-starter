<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg border border-stone-200 bg-white text-stone-950 shadow-sm dark:border-stone-800 dark:bg-[#131313] dark:text-stone-50',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
