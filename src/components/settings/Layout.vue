<script setup lang="ts">
import { Separator } from '../ui/separator'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>

<template>
  <div class="pb-16 space-y-6">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
       {{(t('settings.title'))}}
      </h2>
      <p class="text-muted-foreground">
        {{(t('settings.description'))}}
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col lg:flex-row space-y-6 lg:space-x-12 lg:space-y-0">
      <div class="flex-1 lg:max-w-full">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
