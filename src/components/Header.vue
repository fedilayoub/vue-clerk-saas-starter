<script setup lang="ts">
import { ref } from 'vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Logo from '@/components/Logo.vue'
import Button from '@/components/ui/button/Button.vue'
import { Github } from 'lucide-vue-next'

const isOpen = ref(false)

const navigation = [
  { title: "NavLink1", path: "/navlink1" },
  { title: "NavLink2", path: "/navlink2" },
  { title: "NavLink3", path: "/navlink3" },
  { title: "NavLink4", path: "/navlink4" },
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <!-- Mobile Header -->
  <div class="md:hidden bg-white dark:bg-black">
    <div class="flex items-center justify-between py-5 px-4">
      <Logo :with-text="true" />
      <div class="flex items-center gap-2">
        <a
          href="https://github.com/fedilayoub/vue-clerk-saas-starter"
          target="_blank"
          title="GitHub"
          rel="noopener noreferrer"
          class="cursor-pointer flex items-center justify-center gap-x-1 py-3 px-4 text-white font-medium transform-gpu border border-zinc-300 bg-zinc-50 dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] backdrop-blur rounded-full md:inline-flex hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300"
        >
          <Github class="h-5 w-5 text-black/70 dark:text-white" />
        </a>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Button class="menu-btn" variant="outline" @click="toggleMenu">
          <svg
            v-if="isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 fill-black dark:fill-white"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="mobile-menu fixed inset-0 z-50 bg-white dark:bg-zinc-900">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4 border-b dark:border-zinc-800">
          <Logo :with-text="true" />
          <button
            class="menu-btn text-white hover:text-white"
            @click="toggleMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 fill-gray-800 dark:fill-white"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div class="flex-1 p-4">
          <ul class="space-y-4">
            <li
              v-for="(item, idx) in navigation"
              :key="idx"
              class="dark:text-white/70 dark:hover:text-white text-gray-800 hover:text-black"
            >
              <router-link :to="item.path" class="block py-2 text-lg">
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="p-4 border-t dark:border-zinc-800">
          <router-link
            to="/sign-in"
            class="flex items-center justify-center gap-x-1 py-3 px-4 text-white font-medium transform-gpu border border-zinc-300 bg-zinc-50 dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] backdrop-blur rounded-full w-full"
          >
            <span class="text-black dark:text-white">Sign in</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="w-5 h-5 fill-black dark:fill-white"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop Navigation -->
  <nav class="hidden md:block md:text-sm top-0 inset-x-0 shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 sticky z-30 bg-trasparent">
    <div class="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-24 md:pt-5 bg-transparent">
      <Logo :with-text="true" />
      <div class="flex-1 text-white/90 items-center mt-8 md:mt-0 md:flex block">
        <ul
          class="mx-auto flex justify-center items-center space-y-6 md:space-x-6 md:space-y-0 rounded-full border border-zinc-300 dark:bg-zinc-800/10 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] px-6 py-4 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:text-zinc-200 dark:ring-white/10 w-fit"
        >
          <li
            v-for="(item, idx) in navigation"
            :key="idx"
            class="dark:text-white/70 dark:hover:text-white text-gray-800 hover:text-black"
          >
            <router-link :to="item.path" class="block">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
        <div class="flex items-center justify-end md:flex md:mt-0 gap-2">
          <router-link
            to="/sign-in"
            class="flex items-center justify-center gap-x-1 py-3 px-4 text-white font-medium transform-gpu border border-zinc-300 bg-zinc-50 dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] backdrop-blur rounded-full md:inline-flex"
          >
            <span class="text-black dark:text-white">Sign in</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="w-5 h-5 fill-black dark:fill-white"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </router-link>
          <a
            href="https://github.com/fedilayoub/vue-clerk-saas-starter"
            target="_blank"
            title="GitHub"
            rel="noopener noreferrer"
            class="cursor-pointer flex items-center justify-center gap-x-1 py-3 px-4 text-white font-medium transform-gpu border border-zinc-300 bg-zinc-50 dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] backdrop-blur rounded-full md:inline-flex hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300"
          >
            <Github class="h-5 w-5 text-black/70 dark:text-white" />
          </a>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>
