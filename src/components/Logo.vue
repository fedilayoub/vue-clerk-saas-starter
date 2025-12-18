<script setup lang="ts">
defineProps<{
  withText?: boolean
}>()
</script>

<template>
  <router-link
    :to="{ name: 'home' }"
    title="Home link"
    class="flex justify-start gap-0.5 min-w-fit"
  >
    <img
      src="/logo/logo_light.svg"
      width="40"
      height="40"
      class="size-6 hidden dark:block"
      alt="Starter logo"
    />
    <img
      src="/logo/logo_dark.svg"
      width="40"
      height="40"
      class="size-6 block dark:hidden"
      alt="Starter logo"
    />
    <p v-if="withText" class="flex items-center text-black dark:text-white font-semibold text-md">
      tarter
    </p>
  </router-link>
</template>
