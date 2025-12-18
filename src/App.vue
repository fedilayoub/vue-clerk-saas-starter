<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { onMounted, ref } from 'vue'

const isReady = ref(false)

onMounted(() => {
  // Small delay to ensure smooth transition
  setTimeout(() => {
    isReady.value = true
  }, 50)
})
</script>
<template>
  <Transition name="fade" mode="out-in">
    <div v-if="isReady">
      <router-view></router-view>
      <Toaster />
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>