<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ToastAction, type ToastActionProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastAction v-bind="delegatedProps" :class="cn('inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-stone-100/40 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-stone-50 group-[.destructive]:focus:ring-red-500 dark:border-stone-800 dark:ring-offset-stone-950 dark:hover:bg-stone-800 dark:focus:ring-stone-300 dark:group-[.destructive]:border-stone-800/40 dark:group-[.destructive]:hover:border-red-900/30 dark:group-[.destructive]:hover:bg-red-900 dark:group-[.destructive]:hover:text-stone-50 dark:group-[.destructive]:focus:ring-red-900', props.class)">
    <slot />
  </ToastAction>
</template>
