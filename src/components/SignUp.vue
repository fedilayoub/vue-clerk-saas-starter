<template>
  <section class="container relative flex h-screen items-start pt-[10rem] justify-center bg-white px-4 dark:bg-black">
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

      <!-- Error Alert -->
      <div v-if="error" class="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert">
        {{ error }}
      </div>

      <div class="mx-auto max-w-2xl md:text-center text-gray-700 dark:text-white">
        <h2 class="text-3xl tracking-tighter ">
          {{ showVerification ? 'Verify Email' : 'Sign Up' }}
        </h2>
        <p class="mt-4 text-lg tracking-tight text-gray-700 dark:text-gray-300">
          {{ showVerification ? 'Please enter the verification code sent to your email.' : 'Join thousands of satisfied users who have simplified their email management process.' }}
        </p>
      </div>

      <!-- Sign Up Form -->
      <form v-if="!showVerification" class="mt-6" @submit.prevent="handleSignUp">
        <div class="mb-2">
          <label for="firstName" class="block text-sm font-medium text-gray-900 dark:text-gray-100">First Name</label>
          <Input id="firstName" v-model="firstName" placeholder="John" required type="text" :disabled="loading"
            class="mt-1 block w-full rounded-md text-gray-700 dark:text-white border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
        </div>
        <div class="mb-2">
          <label for="lastName" class="block text-sm font-medium text-gray-900 dark:text-gray-100">Last Name</label>
          <Input id="lastName" v-model="lastName" placeholder="Doe" required type="text" :disabled="loading"
            class="mt-1 block w-full rounded-md text-gray-700 dark:text-white border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
        </div>
        <div class="mb-2">
          <label for="email" class="block text-sm font-medium text-gray-900 dark:text-gray-100">Email</label>
          <Input id="email" v-model="email" placeholder="m@example.com" required type="email" :disabled="loading"
            class="mt-1 block w-full rounded-md text-gray-700 dark:text-white border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
        </div>
        <div class="mb-5">
          <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <Input id="password" v-model="password" placeholder="••••••••" required type="password" :disabled="loading"
            class="mt-1 block w-full rounded-md text-gray-700 dark:text-white border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
        </div>

        <button :disabled="loading"
          class="flex items-center justify-center gap-x-1 py-3 px-4 text-white font-medium transform-gpu bg-[#42b883] hover:bg-[#42b883]/90 rounded-full md:inline-flex cursor-pointer w-full disabled:opacity-50 transition-all duration-300">
          <span v-if="loading"
            class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          <span class="relative">{{ loading ? 'Signing up...' : 'Sign Up' }}</span>
        </button>
      </form>

      <!-- Verification Form -->
      <form v-else class="mt-6" @submit.prevent="handleVerification">
        <div class="mb-5">
          <label for="code" class="block text-sm font-medium text-gray-900 dark:text-gray-100">Verification Code</label>
          <Input id="code" v-model="verificationCode" placeholder="Enter code" required :disabled="loading"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
        </div>

        <button :disabled="loading"
          class="flex items-center justify-center gap-x-1 py-3 px-4 text-white font-medium transform-gpu bg-[#42b883] hover:bg-[#42b883]/90 rounded-full md:inline-flex cursor-pointer w-full disabled:opacity-50 transition-all duration-300">
          <span v-if="loading"
            class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          <span class="relative">{{ loading ? 'Verifying...' : 'Verify Email' }}</span>
        </button>

        <button type="button" :disabled="loading" @click="resendVerification"
          class="w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Didn't receive the code? Click to resend
        </button>
      </form>

      <div class="mt-6 text-center text-sm">
        <p class="text-gray-500 dark:text-gray-400">
          Already have an account?
          <router-link class="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
            to="/sign-in">
            Sign in
          </router-link>
        </p>
        <p class="mt-4 text-gray-500 dark:text-gray-400">
          Forgot your password?
          <router-link class="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
            to="/reset-password">
            Reset password
          </router-link>
        </p>
        <div>
          <ClerkLoading></ClerkLoading>
          {{ user }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSignUp, useClerk, useUser } from '@clerk/vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from '@/components/ui/toast'
import Input from '@/components/ui/input/Input.vue'
import { ClerkLoading } from '@clerk/vue'

const router = useRouter()
const { isLoaded, signUp } = useSignUp()
const { user } = useUser()
const clerk = useClerk()
const { t } = useI18n()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const verificationCode = ref('')
const loading = ref(false)
const error = ref(null)
const showVerification = ref(false)

const handleSignUp = async () => {
  if (!isLoaded.value) return

  loading.value = true
  error.value = null

  try {
    const response = await signUp.value.create({
      firstName: firstName.value,
      lastName: lastName.value,
      emailAddress: email.value,
      password: password.value,
    })

    if (response.status === 'complete') {
      toast({
        title: t('auth.sign_up_success'),
        description: t('auth.sign_up_success_description'),
      })
      clerk.value.redirectToAfterSignUp()
    } else if (response.status === 'missing_requirements' ||
      response.status === 'needs_email_verification') {
      await signUp.value.prepareEmailAddressVerification()
      showVerification.value = true
      toast({
        title: t('auth.verification_code_sent'),
        description: t('auth.verification_code_sent_description'),
      })
    }

  } catch (err) {
    error.value = err.errors?.[0]?.long_message || err.errors?.[0]?.message || err.message
    console.error('Sign-up failed:', err)
    toast({
      title: t('auth.sign_up_failed'),
      description: error.value,
      variant: 'destructive',
    })
  } finally {
    loading.value = false
  }
}

const handleVerification = async () => {
  if (!isLoaded.value) return

  loading.value = true
  error.value = null

  try {
    const response = await signUp.value.attemptEmailAddressVerification({
      code: verificationCode.value
    })

    if (response.status === 'complete') {
      toast({
        title: t('auth.verification_success'),
        description: t('auth.verification_success_description'),
      })
      toast({
        title: t('auth.sign_up_success'),
        description: t('auth.sign_up_success_description'),
      })
      clerk.value.redirectToAfterSignIn()
    } else {
      error.value = `Unexpected status: ${response.status}`
      toast({
        title: t('auth.verification_failed'),
        description: error.value,
        variant: 'destructive',
      })
    }

  } catch (err) {
    error.value = err.errors?.[0]?.long_message || err.errors?.[0]?.message || err.message
    console.error('Verification failed:', err)
    toast({
      title: t('auth.verification_failed'),
      description: error.value,
      variant: 'destructive',
    })
  } finally {
    loading.value = false
  }
}

const resendVerification = async () => {
  if (!isLoaded.value || loading.value) return

  loading.value = true
  error.value = null

  try {
    await signUp.value.prepareEmailAddressVerification()
    toast({
      title: t('auth.verification_code_resent'),
      description: t('auth.verification_code_resent_description'),
    })
  } catch (err) {
    error.value = err.errors?.[0]?.long_message || err.errors?.[0]?.message || err.message
    console.error('Failed to resend verification:', err)
    toast({
      title: t('auth.verification_failed'),
      description: error.value,
      variant: 'destructive',
    })
  } finally {
    loading.value = false
  }
}
</script>