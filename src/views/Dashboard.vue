<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

const { t } = useI18n()

// Update browser tab title based on current language
watchEffect(() => {
  document.title = t('navigation.dashboard')
})
</script>

<template>
  <div class="w-full flex flex-col gap-4 h-full">
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Stats Cards Section -->
      <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 md:gap-8">
        <Card class="bg-white/10 dark:bg-black/10 backdrop-blur-md border-gray-200/50 dark:border-white/20">
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              {{ t('dashboard_cards.stat_card_title') }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-xs text-muted-foreground">
              {{ t('dashboard_cards.stat_card_subtitle') }}
            </p>
          </CardContent>
        </Card>
        <Card class="bg-white/10 dark:bg-black/10 backdrop-blur-md border-gray-200/50 dark:border-white/20">
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              {{ t('dashboard_cards.stat_card_title') }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-xs text-muted-foreground">
              {{ t('dashboard_cards.stat_card_subtitle') }}
            </p>
          </CardContent>
        </Card>
        <Card class="bg-white/10 dark:bg-black/10 backdrop-blur-md border-gray-200/50 dark:border-white/20">
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              {{ t('dashboard_cards.stat_card_title') }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-xs text-muted-foreground">
              {{ t('dashboard_cards.stat_card_subtitle') }}
            </p>
          </CardContent>
        </Card>
        <Card class="bg-white/10 dark:bg-black/10 backdrop-blur-md border-gray-200/50 dark:border-white/20">
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              {{ t('dashboard_cards.stat_card_title') }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-xs text-muted-foreground">
              {{ t('dashboard_cards.stat_card_subtitle') }}
            </p>
          </CardContent>
        </Card>
      </div>

      <!-- Main Content Section -->
      <div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 md:gap-8 flex-1">
        <Card class="xl:col-span-2 flex flex-col bg-white/10 dark:bg-black/10 backdrop-blur-md border-gray-200/50 dark:border-white/20">
          <CardHeader>
            <CardTitle>{{ t('dashboard_cards.main_card_title') }}</CardTitle>
            <CardDescription>{{ t('dashboard_cards.main_card_subtitle') }}</CardDescription>
          </CardHeader>
          <CardContent class="pl-2 flex-1">
            <!-- Add your main content here -->
          </CardContent>
        </Card>
        <Card class="flex flex-col bg-white/10 dark:bg-black/10 backdrop-blur-md border-gray-200/50 dark:border-white/20">
          <CardHeader>
            <CardTitle>{{ t('dashboard_cards.side_card_title') }}</CardTitle>
            <CardDescription>{{ t('dashboard_cards.side_card_subtitle') }}</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-8 flex-1">
            <!-- Add your secondary content here -->
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
