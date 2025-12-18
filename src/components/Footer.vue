<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import FooterSection from '@/components/footer/FooterSection.vue'
import { footerConfig } from '@/components/footer/config'

const { description, sections } = footerConfig
const mainSections = sections.slice(0, 3)
const moreSections = sections.slice(3)
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="w-full bg-white dark:bg-black">
    <div class="container mx-auto flex justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div class="w-full max-w-7xl">
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <!-- Brand Section -->
          <div class="flex flex-col gap-2 md:gap-4 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2">
            <Logo :with-text="true" />
            <div class="flex flex-col gap-2 lg:gap-4">
              <p class="text-sm text-muted-foreground lg:max-w-[380px]">
                {{ description.primary }}
              </p>
              <p class="text-sm text-muted-foreground lg:max-w-[380px]">
                {{ description.secondary }}
              </p>
            </div>
          </div>

          <!-- Main Sections -->
          <FooterSection
            v-for="section in mainSections"
            :key="section.title"
            :section="section"
          />

          <!-- More Sections - Hidden on small screens -->
          <FooterSection
            v-for="section in moreSections"
            :key="section.title"
            :section="section"
            class-name="flex-col gap-2 md:gap-4 flex sm:hidden md:flex"
          />
        </div>

        <!-- Footer Bottom Section -->
        <div class="mt-8 pt-8 border-t flex flex-col justify-center items-center sm:flex-row sm:justify-between gap-4 text-xs text-muted-foreground">
          <div class="flex gap-4">
            <p>
              © {{ currentYear }}
              <a href="#" class="hover:text-foreground transition-colors">
                Starter
              </a>
              . All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
  