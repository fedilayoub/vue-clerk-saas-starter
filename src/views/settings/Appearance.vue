<script setup lang="ts">
import SettingsLayout from '@/components/settings/Layout.vue'
import SettingsAppearanceForm from '@/components/settings/AppearanceForm.vue'
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

const { t } = useI18n()

// Update browser tab title based on current language
watchEffect(() => {
  document.title = t('settings.appearance.title')
})
</script>

<template>
  <SettingsLayout>
    <SettingsAppearanceForm />
  </SettingsLayout>
</template>

<style scoped>

</style>
