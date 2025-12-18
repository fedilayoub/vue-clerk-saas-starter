<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="ghost" size="icon" class="gap-2 w-full">
        <LogOut />
      Sign Out
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Sign Out</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to sign out of your account?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          :disabled="loading"
          @click="handleSignOut"
          class="bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-700"
        >
          <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />
          <span>{{ loading ? 'Signing out...' : 'Sign Out' }}</span>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <div v-if="error" class="fixed bottom-4 right-4">
    <Alert variant="destructive">
      <AlertCircle class="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth, useClerk } from '@clerk/vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from '@/components/ui/toast'
import { LogOut, Loader2, AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'

const router = useRouter()
const { signOut, isLoaded } = useAuth()
const clerk = useClerk()
const { t } = useI18n()

const loading = ref(false)
const error = ref(null)

const handleSignOut = async () => {
  if (!isLoaded.value) return
  
  loading.value = true
  error.value = null
  
  try {
    await signOut.value()
    toast({
      title: t('auth.sign_out_success'),
      description: t('auth.sign_out_success_description'),
    })
    clerk.value.redirectToAfterSignOut()
  } catch (err) {
    error.value = err.errors?.[0]?.long_message || err.errors?.[0]?.message || err.message
    console.error('Sign-out failed:', err)
    toast({
      title: t('auth.sign_out_failed'),
      description: error.value,
      variant: 'destructive',
    })
  } finally {
    loading.value = false
  }
}
</script>