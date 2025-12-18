<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref, watch, computed } from 'vue'
import * as z from 'zod'
import { toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@clerk/vue'
import { useI18n } from 'vue-i18n'
import { Lock } from 'lucide-vue-next'

const { user, isLoaded } = useUser()
const { t } = useI18n()
const isUpdating = ref(false)
const isUpdatingPassword = ref(false)
const showPasswordSection = ref(false)

const profileFormSchema = toTypedSchema(z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'First name must be at least 1 character.',
    })
    .max(50, {
      message: 'First name must not be longer than 50 characters.',
    })
    .optional(),
  lastName: z
    .string()
    .min(1, {
      message: 'Last name must be at least 1 character.',
    })
    .max(50, {
      message: 'Last name must not be longer than 50 characters.',
    })
    .optional(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .optional(),
}))

const { 
  handleSubmit: handleProfileSubmit, 
  resetForm: resetProfileForm, 
  setValues: setProfileValues,
  defineField: defineProfileField,
} = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
  },
})

const [firstName, firstNameAttrs] = defineProfileField('firstName')
const [lastName, lastNameAttrs] = defineProfileField('lastName')
const [email, emailAttrs] = defineProfileField('email')

// Load user data from Clerk when available
watch(() => user.value, (userData) => {
  if (userData) {
    setProfileValues({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.primaryEmailAddress?.emailAddress || '',
    })
  }
}, { immediate: true })

const userImageUrl = computed(() => {
  return user.value?.imageUrl || ''
})

const onSubmit = handleProfileSubmit(async (values) => {
  if (!user.value) {
    toast({
      title: 'Error',
      description: 'User not loaded. Please try again.',
      variant: 'destructive',
    })
    return
  }

  isUpdating.value = true

  try {
    // Update user via Clerk API
    await user.value.update({
      firstName: values.firstName,
      lastName: values.lastName,
    })

    toast({
      title: t('settings.profile.profile_updated'),
      description: 'Your profile has been updated successfully.',
    })
  } catch (error: any) {
    console.error('Profile update error:', error)
    toast({
      title: t('settings.profile.profile_update_failed'),
      description: error.errors?.[0]?.message || 'An error occurred while updating your profile.',
      variant: 'destructive',
    })
  } finally {
    isUpdating.value = false
  }
})

// Password update form
const passwordFormSchema = toTypedSchema(z.object({
  currentPassword: z
    .string()
    .min(8, {
      message: 'Current password is required.',
    }),
  newPassword: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: 'Please confirm your password.',
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
}))

const { 
  handleSubmit: handlePasswordSubmit, 
  resetForm: resetPasswordForm,
  defineField: definePasswordField,
} = useForm({
  validationSchema: passwordFormSchema,
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
})

const [currentPassword, currentPasswordAttrs] = definePasswordField('currentPassword')
const [newPassword, newPasswordAttrs] = definePasswordField('newPassword')
const [confirmPassword, confirmPasswordAttrs] = definePasswordField('confirmPassword')

const onPasswordSubmit = handlePasswordSubmit(async (values) => {
  if (!user.value) {
    toast({
      title: 'Error',
      description: 'User not loaded. Please try again.',
      variant: 'destructive',
    })
    return
  }

  isUpdatingPassword.value = true

  try {
    // Update password - Clerk requires currentPassword for verification
    await user.value.updatePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      signOutOfOtherSessions: false,
    })

    toast({
      title: t('settings.profile.password_updated'),
      description: t('settings.profile.password_updated_description'),
    })

    // Reset form and hide password section
    resetPasswordForm()
    showPasswordSection.value = false
    
    // Reload user to ensure session is fresh
    await user.value.reload()
    
  } catch (error: any) {
    console.error('Password update error:', error)
    
    // Check if reverification is required
    if (error.errors?.[0]?.code === 'session_reverification_required') {
      toast({
        title: t('settings.profile.reverification_required'),
        description: t('settings.profile.reverification_required_description'),
        variant: 'destructive',
      })
    } else if (error.errors?.[0]?.code === 'form_password_incorrect') {
      // Handle incorrect current password
      toast({
        title: t('settings.profile.password_update_failed'),
        description: t('settings.profile.current_password_incorrect'),
        variant: 'destructive',
      })
    } else if (error.errors?.[0]?.code === 'form_password_pwned') {
      // Handle compromised password
      toast({
        title: t('settings.profile.password_update_failed'),
        description: t('settings.profile.password_compromised'),
        variant: 'destructive',
      })
    } else {
      // Handle other errors
      toast({
        title: t('settings.profile.password_update_failed'),
        description: error.errors?.[0]?.long_message || error.errors?.[0]?.message || 'An error occurred while updating your password.',
        variant: 'destructive',
      })
    }
  } finally {
    isUpdatingPassword.value = false
  }
})
</script>

<template>
  <div v-if="!isLoaded" class="flex items-center justify-center py-8">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
  </div>

  <div v-else class="w-full space-y-6">
    <!-- Header with Avatar -->
    <div class="flex items-center gap-4">
      <div v-if="userImageUrl" class="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 flex-shrink-0">
        <img :src="userImageUrl" :alt="user?.firstName || 'User'" class="w-full h-full object-cover rounded-full" />
      </div>
      <div>
        <h3 class="text-lg font-medium">
          {{ t('settings.profile.title') }}
        </h3>
        <p class="text-sm text-muted-foreground">
          {{ t('settings.profile.description') }}
        </p>
      </div>
    </div>
    
    <Separator />

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <!-- Profile Information Card -->
      <Card class="w-full">
        <CardHeader class="pb-3">
          <CardTitle class="text-lg">{{ t('settings.profile.personal_info') }}</CardTitle>
          <CardDescription class="text-xs">{{ t('settings.profile.personal_info_description') }}</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="space-y-4" @submit="onSubmit">
            <!-- First Name -->
            <FormField name="firstName">
              <FormItem>
                <FormLabel>{{ t('settings.profile.first_name') }}</FormLabel>
                <FormControl>
                  <Input 
                    v-model="firstName" 
                    v-bind="firstNameAttrs"
                    type="text" 
                    :placeholder="t('settings.profile.first_name_placeholder')" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Last Name -->
            <FormField name="lastName">
              <FormItem>
                <FormLabel>{{ t('settings.profile.last_name') }}</FormLabel>
                <FormControl>
                  <Input 
                    v-model="lastName"
                    v-bind="lastNameAttrs"
                    type="text" 
                    :placeholder="t('settings.profile.last_name_placeholder')" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Email (Read-only) -->
            <FormField name="email">
              <FormItem>
                <FormLabel>{{ t('settings.profile.email') }}</FormLabel>
                <FormControl>
                  <Input 
                    v-model="email"
                    v-bind="emailAttrs"
                    type="text" 
                    :placeholder="t('settings.profile.email_placeholder')" 
                    disabled 
                    readonly 
                    class="bg-muted cursor-not-allowed" 
                  />
                </FormControl>
                <FormDescription class="text-xs">
                  {{ t('settings.profile.email_helper_text') }}
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex gap-2 pt-2">
              <Button type="submit" :disabled="isUpdating" size="sm" class="bg-accent text-accent-foreground hover:bg-accent/90">
                <span v-if="isUpdating">{{ t('common.loading') }}</span>
                <span v-else>{{ t('settings.profile.update_profile') }}</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                @click="resetProfileForm()"
                :disabled="isUpdating"
              >
                {{ t('common.cancel') }}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <!-- Password Update Card -->
      <Card class="w-full">
        <CardHeader class="pb-3">
          <div class="flex items-center gap-2">
            <Lock class="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle class="text-lg">{{ t('settings.profile.password_section_title') }}</CardTitle>
              <CardDescription class="text-xs mt-1">{{ t('settings.profile.password_section_description') }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="!showPasswordSection">
            <p class="text-sm text-muted-foreground mb-4">
              {{ t('settings.profile.password_prompt') }}
            </p>
            <Button 
              variant="outline" 
              size="sm"
              @click="showPasswordSection = true"
              class="w-full"
            >
              <Lock class="h-4 w-4 mr-2" />
              {{ t('settings.profile.change_password') }}
            </Button>
          </div>

          <form v-else class="space-y-4" @submit="onPasswordSubmit">
            <!-- Current Password -->
            <FormField name="currentPassword">
              <FormItem>
                <FormLabel>{{ t('settings.profile.current_password') }}</FormLabel>
                <FormControl>
                  <Input 
                    v-model="currentPassword"
                    v-bind="currentPasswordAttrs"
                    type="password" 
                    :placeholder="t('settings.profile.current_password_placeholder')" 
                    autocomplete="current-password" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- New Password -->
            <FormField name="newPassword">
              <FormItem>
                <FormLabel>{{ t('settings.profile.new_password') }}</FormLabel>
                <FormControl>
                  <Input 
                    v-model="newPassword"
                    v-bind="newPasswordAttrs"
                    type="password" 
                    :placeholder="t('settings.profile.new_password_placeholder')" 
                    autocomplete="new-password" 
                  />
                </FormControl>
                <FormDescription class="text-xs">
                  {{ t('settings.profile.new_password_helper_text') }}
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Confirm New Password -->
            <FormField name="confirmPassword">
              <FormItem>
                <FormLabel>{{ t('settings.profile.confirm_password') }}</FormLabel>
                <FormControl>
                  <Input 
                    v-model="confirmPassword"
                    v-bind="confirmPasswordAttrs"
                    type="password" 
                    :placeholder="t('settings.profile.confirm_password_placeholder')" 
                    autocomplete="new-password" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="flex gap-2 pt-2">
              <Button 
                type="submit" 
                size="sm"
                :disabled="isUpdatingPassword"
                class="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <span v-if="isUpdatingPassword">{{ t('common.loading') }}</span>
                <span v-else>{{ t('settings.profile.update_password') }}</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                @click="() => { resetPasswordForm(); showPasswordSection = false }"
                :disabled="isUpdatingPassword"
              >
                {{ t('common.cancel') }}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
