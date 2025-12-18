<script setup lang="ts">
import SettingsLayout from '@/components/settings/Layout.vue'
import SettingsProfileForm from '@/components/settings/ProfileForm.vue'
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

const { t } = useI18n()

// Update browser tab title based on current language
watchEffect(() => {
  document.title = t('settings.profile.title')
})
</script>

<template>
  <SettingsLayout>
    <SettingsProfileForm />
  </SettingsLayout>
</template>

<style scoped>

</style>