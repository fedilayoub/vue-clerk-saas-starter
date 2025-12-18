<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

const { t } = useI18n()

// Update browser tab title based on current language
watchEffect(() => {
  document.title = t('pages.page_one')
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <h1 class="text-4xl font-bold">
      {{ t('pages.page_one') }}
    </h1>
  </div>
</template>
