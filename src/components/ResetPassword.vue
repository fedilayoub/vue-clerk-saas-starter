<template>
    <section
        class="container flex min-h-[100dvh] relative items-start pt-[10rem] justify-center bg-white px-4 dark:bg-black">
        <div class="absolute inset-0 blur-xl h-[580px]" :style="{
            background: 'linear-gradient(143.6deg, rgba(66, 184, 131, 0) 20.79%, rgba(66, 184, 131, 0.26) 40.92%, rgba(66, 184, 131, 0) 70.35%)'
        }"></div>
        <div v-if="!isLoaded" class="z-10">
            <div class="flex items-center justify-center">
                <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        </div>

        <div v-else
            class="mx-auto z-10 text-gray-700 w-full max-w-[500px] backdrop-blur border border-gray-200 dark:border-white/10 px-2 md:px-4 py-4 rounded-lg">

            <!-- Error/Success Alert -->
            <div v-if="error || successMessage" :class="[
                'mb-4 p-4 text-sm rounded-lg',
                error ? 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800' : 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800'
            ]" role="alert">
                {{ error || successMessage }}
            </div>

            <div class="mx-auto max-w-2xl md:text-center text-gray-700 dark:text-white">
                <h2 class="text-3xl tracking-tighter ">
                    {{ showResetForm ? 'Reset Password' : 'Forgot Password' }}
                </h2>
                <p class="mt-4 text-lg tracking-tight text-gray-700 dark:text-gray-300">
                    {{ showResetForm
                        ? 'Enter the code sent to your email and your new password'
                        : 'Enter your email address and we will send you a reset link'
                    }}
                </p>
            </div>

            <!-- Request Reset Form -->
            <form v-if="!showResetForm" class="space-y-4 mt-6" @submit.prevent="handleRequestReset">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-900 dark:text-gray-100">Email</label>
                    <Input id="email" v-model="email" placeholder="m@example.com" required type="email"
                        :disabled="loading"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
                </div>

                <button :disabled="loading"
                    class="flex items-center justify-center gap-x-1 py-3 px-4 text-black font-medium transform-gpu bg-accent rounded-full md:inline-flex cursor-pointer w-full disabled:opacity-50">
                    <span v-if="loading"
                        class="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                    <span class="relative">{{ loading ? 'Sending...' : 'Send Reset Code' }}</span>
                </button>
            </form>

            <!-- Reset Password Form -->
            <form v-else class="mt-6" @submit.prevent="handleResetPassword">
                <div class="mb-2">
                    <label for="code" class="block text-sm font-medium text-gray-900 dark:text-gray-100">Verification
                        Code</label>
                    <Input id="code" v-model="code" placeholder="Enter code from email" required :disabled="loading"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
                </div>

                <div class="mb-5">
                    <label for="newPassword" class="block text-sm font-medium text-gray-900 dark:text-gray-100">New
                        Password</label>
                    <Input id="newPassword" v-model="newPassword" placeholder="••••••••" required type="password"
                        :disabled="loading"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
                </div>

                <button :disabled="loading"
                    class="flex items-center justify-center gap-x-1 py-3 px-4 text-black font-medium transform-gpu bg-accent rounded-full md:inline-flex cursor-pointer w-full disabled:opacity-50">
                    <span v-if="loading"
                        class="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                    <span class="relative">{{ loading ? 'Resetting...' : 'Reset Password' }}</span>
                </button>

                <button type="button" :disabled="loading" @click="resendCode"
                    class="w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Didn't receive the code? Click to resend
                </button>
            </form>

            <div class="mt-6 text-center text-sm">
                <p class="text-gray-500 dark:text-gray-400">
                    Remember your password?
                    <router-link
                        class="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
                        to="/sign-in">
                        Sign in
                    </router-link>
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useClerk, useSignIn } from '@clerk/vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from '@/components/ui/toast'
import Input from '@/components/ui/input/Input.vue'

const router = useRouter()
const { isLoaded, signIn } = useSignIn()
const clerk = useClerk()
const { t } = useI18n()

const email = ref('')
const code = ref('')
const newPassword = ref('')
const loading = ref(false)
const error = ref(null)
const successMessage = ref(null)
const showResetForm = ref(false)

const handleRequestReset = async () => {
  if (!isLoaded.value) return

  loading.value = true
  error.value = null
  successMessage.value = null

  try {
    await signIn.value.create({
      strategy: 'reset_password_email_code',
      identifier: email.value,
    })

    showResetForm.value = true
    toast({
      title: t('password_reset.code_sent'),
      description: t('password_reset.code_sent_description'),
    })

  } catch (err) {
    error.value = err.errors?.[0]?.long_message || err.errors?.[0]?.message || err.message
    console.error('Reset request failed:', err)
    toast({
      title: t('password_reset.reset_failed'),
      description: error.value,
      variant: 'destructive',
    })
  } finally {
    loading.value = false
  }
}

const handleResetPassword = async () => {
  if (!isLoaded.value) return

  loading.value = true
  error.value = null
  successMessage.value = null

  try {
    const result = await signIn.value.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code: code.value,
      password: newPassword.value,
    })

    if (result.status === 'complete') {
      toast({
        title: t('password_reset.reset_success'),
        description: t('password_reset.reset_success_description'),
      })
      setTimeout(() => {
        clerk.value.redirectToAfterSignIn()
      }, 2000)
    } else {
      error.value = `Unexpected status: ${result.status}`
      toast({
        title: t('password_reset.reset_failed'),
        description: error.value,
        variant: 'destructive',
      })
    }

  } catch (err) {
    error.value = err.errors?.[0]?.long_message || err.errors?.[0]?.message || err.message
    console.error('Password reset failed:', err)
    toast({
      title: t('password_reset.reset_failed'),
      description: error.value,
      variant: 'destructive',
    })
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  if (!isLoaded.value || loading.value) return

  loading.value = true
  error.value = null
  successMessage.value = null

  try {
    await signIn.value.create({
      strategy: 'reset_password_email_code',
      identifier: email.value,
    })

    toast({
      title: t('password_reset.code_resent'),
      description: t('password_reset.code_resent_description'),
    })
  } catch (err) {
    error.value = err.errors?.[0]?.long_message || err.errors?.[0]?.message || err.message
    console.error('Failed to resend code:', err)
    toast({
      title: t('password_reset.reset_failed'),
      description: error.value,
      variant: 'destructive',
    })
  } finally {
    loading.value = false
  }
}
</script>