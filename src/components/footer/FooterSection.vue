<script setup lang="ts">
import type { FooterSection as FooterSectionType } from './config'

interface Props {
  section: FooterSectionType
  className?: string
}

defineProps<Props>()
</script>

<template>
  <div :class="`flex flex-col gap-2 md:gap-4 ${className || ''}`">
    <h3 class="pt-1 text-sm font-semibold">{{ section.title }}</h3>
    <router-link
      v-for="item in section.items"
      :key="item.href"
      :to="item.href"
      class="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {{ item.title }}
    </router-link>
  </div>
</template>
