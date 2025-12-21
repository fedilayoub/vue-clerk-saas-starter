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
            class="mx-auto z-10 text-gray-700 w-full max-w-[500px] backdrop-blur bg-transparent border border-gray-200 dark:border-white/10 px-2 md:px-4 py-4 rounded-lg ">

            <!-- Error Alert -->
            <div v-if="error"
                class="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert">
                {{ error }}
            </div>

            <div class="mx-auto max-w-2xl md:text-center text-gray-700 dark:text-white">
                <h2 class="text-3xl tracking-tighter ">
                    {{ showVerification ? t('auth.sign_in.verify_title') : t('auth.sign_in.title') }}
                </h2>
                <p class="mt-4 text-lg tracking-tight text-gray-700 dark:text-gray-300">
                    {{ showVerification ? t('auth.sign_in.verify_description') : t('auth.sign_in.description') }}
                </p>
            </div>

            <!-- Sign In Form -->
            <form v-if="!showVerification" class="mt-6" @submit.prevent="handleSignIn">
                <div class="mb-2">
                    <label for="email" class="block text-sm font-medium text-gray-900 dark:text-gray-100">{{ t('auth.sign_in.email_label') }}</label>
                    <Input id="email" v-model="email" placeholder="m@example.com" required type="email"
                        :disabled="loading"
                        class="mt-1 block w-full rounded-md text-gray-700 dark:text-white border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
                </div>
                <div class="mb-5">
                    <label for="password"
                        class="block text-sm font-medium text-gray-900 dark:text-gray-100">{{ t('auth.sign_in.password_label') }}</label>
                    <Input id="password" v-model="password" :placeholder="t('auth.sign_in.password_placeholder')" required type="password"
                        :disabled="loading"
                        class="mt-1 block w-full rounded-md text-gray-700 dark:text-white border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
                </div>

                <button :disabled="loading"
                    class="flex items-center justify-center py-3 px-4 mt-5 text-white font-medium transform-gpu bg-[#42b883] hover:bg-[#42b883]/90 rounded-full md:inline-flex cursor-pointer w-full disabled:opacity-50 transition-all duration-300">
                    <span v-if="loading"
                        class="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white"></span>
                    <span class="relative">{{ loading ? t('auth.sign_in.signing_in') : t('auth.sign_in.sign_in_button') }}</span>
                </button>
            </form>

            <!-- Verification Form -->
            <form v-else class="space-y-4 mt-6" @submit.prevent="handleVerification">
                <div>
                    <label for="code" class="block text-sm font-medium text-gray-900 dark:text-gray-100">{{ t('auth.sign_in.verification_code_label') }}</label>
                    <Input id="code" v-model="verificationCode" :placeholder="t('auth.sign_in.verification_code_placeholder')" required :disabled="loading"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-800 focus:ring-neutral-800" />
                </div>

                <button :disabled="loading"
                    class="flex items-center justify-center gap-x-1 py-3 px-4 text-white font-medium transform-gpu bg-[#42b883] hover:bg-[#42b883]/90 rounded-full md:inline-flex cursor-pointer w-full disabled:opacity-50 transition-all duration-300">
                    <span v-if="loading"
                        class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    <span class="relative">{{ loading ? t('auth.sign_in.verifying') : t('auth.sign_in.verify_button') }}</span>
                </button>

                <button type="button" :disabled="loading" @click="resendVerification"
                    class="w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    {{ t('auth.sign_in.resend_code') }}
                </button>
            </form>

            <div class="mt-6 text-center text-sm">
                <p class="text-gray-500 dark:text-gray-400">
                    {{ t('auth.sign_in.no_account') }}
                    <router-link
                        class="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
                        to="/sign-up">
                        {{ t('auth.sign_in.sign_up_link') }}
                    </router-link>
                </p>
                <p class="mt-4 text-gray-500 dark:text-gray-400">
                    {{ t('auth.sign_in.forgot_password') }}
                    <router-link
                        class="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-gray-500 ml-2"
                        to="/reset-password">
                        {{ t('auth.sign_in.reset_password_link') }}
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
import { useAuth, useClerk, useSignIn, useUser } from '@clerk/vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from '@/components/ui/toast'
import Input from '@/components/ui/input/Input.vue'
import { ClerkLoading } from '@clerk/vue'

const router = useRouter()
const { isLoaded, signIn } = useSignIn()
const { isSignedIn } = useAuth()
const { user } = useUser()
const clerk = useClerk()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const verificationCode = ref('')
const loading = ref(false)
const error = ref(null)
const showVerification = ref(false)

const handleSignIn = async () => {
  if (!isLoaded.value) return

  loading.value = true
  error.value = null

  try {
    const result = await signIn.value.create({
      identifier: email.value,
      password: password.value,
    })

    if (result.status === 'complete') {
      toast({
        title: t('auth.sign_in_success'),
        description: t('auth.sign_in_success_description'),
      })
      clerk.value.redirectToAfterSignIn()
    } else if (result.status === 'needs_verification') {
      await signIn.value.prepareFirstFactor({
        strategy: 'email_code',
        email: email.value
      })
      showVerification.value = true
      toast({
        title: t('auth.verification_code_sent'),
        description: t('auth.verification_code_sent_description'),
      })
    } else if (result.status === 'needs_second_factor') {
      // Handle Client Trust - automatic second factor verification on new devices
      const hasEmailCode = result.supportedSecondFactors?.some(
        factor => factor.strategy === 'email_code'
      )
      
      if (hasEmailCode) {
        // Prepare second factor (sends verification code to email)
        await signIn.value.prepareSecondFactor({
          strategy: 'email_code'
        })
        showVerification.value = true
        toast({
          title: t('auth.verification_code_sent'),
          description: t('auth.sign_in.verify_new_device'),
        })
      } else {
        error.value = t('auth.sign_in.second_factor_required')
        toast({
          title: t('auth.sign_in_failed'),
          description: error.value,
          variant: 'destructive',
        })
      }
    } else {
      error.value = `${t('auth.sign_in.unexpected_status')}: ${result.status}`
      toast({
        title: t('auth.sign_in_failed'),
        description: error.value,
        variant: 'destructive',
      })
    }

  } catch (err) {
    error.value = err.errors?.[0]?.long_message || err.errors?.[0]?.message || err.message
    console.error('Sign-in failed:', err)
    toast({
      title: t('auth.sign_in_failed'),
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
    // Determine if we need first factor or second factor verification
    const signInAttempt = signIn.value
    let result

    if (signInAttempt.status === 'needs_second_factor') {
      // Handle second factor (Client Trust)
      result = await signIn.value.attemptSecondFactor({
        strategy: 'email_code',
        code: verificationCode.value
      })
    } else {
      // Handle first factor
      result = await signIn.value.attemptFirstFactor({
        strategy: 'email_code',
        code: verificationCode.value
      })
    }

    if (result.status === 'complete') {
      toast({
        title: t('auth.verification_success'),
        description: t('auth.verification_success_description'),
      })
      toast({
        title: t('auth.sign_in_success'),
        description: t('auth.sign_in_success_description'),
      })
      clerk.value.redirectToAfterSignIn()
    } else {
      error.value = `${t('auth.sign_in.unexpected_status')}: ${result.status}`
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
    const signInAttempt = signIn.value

    if (signInAttempt.status === 'needs_second_factor') {
      // Resend second factor code
      await signIn.value.prepareSecondFactor({
        strategy: 'email_code'
      })
    } else {
      // Resend first factor code
      await signIn.value.prepareFirstFactor({
        strategy: 'email_code',
        email: email.value
      })
    }

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