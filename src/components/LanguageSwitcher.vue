<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Check } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/plugins/i18n'
import { computed } from 'vue'

const { locale } = useI18n()

const currentLanguage = computed(() => {
  return locale.value.toUpperCase()
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="h-8 px-2 text-xs font-medium text-foreground">
        {{ currentLanguage }}
        <span class="sr-only">Switch language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="setLocale('en')" class="cursor-pointer">
        <Check v-if="locale === 'en'" class="h-4 w-4 mr-2" />
        <span :class="{ 'ml-6': locale !== 'en' }">English</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setLocale('fr')" class="cursor-pointer">
        <Check v-if="locale === 'fr'" class="h-4 w-4 mr-2" />
        <span :class="{ 'ml-6': locale !== 'fr' }">Français</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

