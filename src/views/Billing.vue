<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useI18n } from 'vue-i18n'
import { CreditCard, Calendar, Download, Check } from 'lucide-vue-next'
import { ref, computed, watchEffect } from 'vue'

const { t } = useI18n()

// Update browser tab title based on current language
watchEffect(() => {
  document.title = t('billing.title')
})

interface Invoice {
  id: string
  date: string
  amount: number
  status: string
  plan: string
}

const currentPlanKey = ref('free')

const currentPlan = computed(() => ({
  name: t('billing.plans.free.name'),
  price: 0,
  billingCycle: 'monthly',
  features: [
    t('billing.plans.free.feature_1'),
    t('billing.plans.free.feature_2'),
    t('billing.plans.free.feature_3'),
    t('billing.plans.free.feature_4'),
  ],
}))

const plans = computed(() => [
  {
    key: 'free',
    name: t('billing.plans.free.name'),
    price: 0,
    billingCycle: 'monthly',
    description: t('billing.plans.free.description'),
    features: [
      t('billing.plans.free.feature_1'),
      t('billing.plans.free.feature_2'),
      t('billing.plans.free.feature_3'),
      t('billing.plans.free.feature_4'),
    ],
    recommended: false,
  },
  {
    key: 'pro',
    name: t('billing.plans.pro.name'),
    price: 29,
    billingCycle: 'monthly',
    description: t('billing.plans.pro.description'),
    features: [
      t('billing.plans.pro.feature_1'),
      t('billing.plans.pro.feature_2'),
      t('billing.plans.pro.feature_3'),
      t('billing.plans.pro.feature_4'),
      t('billing.plans.pro.feature_5'),
      t('billing.plans.pro.feature_6'),
    ],
    recommended: true,
  },
  {
    key: 'enterprise',
    name: t('billing.plans.enterprise.name'),
    price: 99,
    billingCycle: 'monthly',
    description: t('billing.plans.enterprise.description'),
    features: [
      t('billing.plans.enterprise.feature_1'),
      t('billing.plans.enterprise.feature_2'),
      t('billing.plans.enterprise.feature_3'),
      t('billing.plans.enterprise.feature_4'),
      t('billing.plans.enterprise.feature_5'),
      t('billing.plans.enterprise.feature_6'),
    ],
    recommended: false,
  },
])

// Sample invoice data - replace with actual data from your backend
const invoices = ref<Invoice[]>([
  // {
  //   id: 'INV-001',
  //   date: '2024-01-01',
  //   amount: 0,
  //   status: 'paid',
  //   plan: 'Free',
  // },
])
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t('billing.title') }}</h1>
        <p class="text-muted-foreground">{{ t('billing.description') }}</p>
      </div>
    </div>

    <!-- Current Plan & Payment Method Grid -->
    <div class="grid gap-4 lg:grid-cols-2">
      <!-- Current Plan Summary -->
      <Card>
        <CardHeader class="pb-3">
          <div class="flex items-center justify-between">
            <CardTitle class="text-lg">{{ t('billing.current_plan') }}</CardTitle>
            <Badge variant="default">{{ currentPlan.name }}</Badge>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold">${{ currentPlan.price }}</span>
            <span class="text-muted-foreground text-sm">/{{ t('billing.month') }}</span>
          </div>
          <Separator />
          <ul class="space-y-1.5">
            <li v-for="(feature, index) in currentPlan.features" :key="index" class="flex items-center gap-2 text-sm">
              <Check class="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <!-- Payment Method -->
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-lg">{{ t('billing.payment_method') }}</CardTitle>
          <CardDescription class="text-xs">{{ t('billing.payment_method_description') }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-start gap-3 rounded-lg border p-3">
            <CreditCard class="h-6 w-6 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm">{{ t('billing.no_payment_method') }}</p>
              <p class="text-xs text-muted-foreground mt-0.5">{{ t('billing.add_payment_method_description') }}</p>
            </div>
            <Button variant="outline" size="sm" class="flex-shrink-0">{{ t('billing.add_payment_method') }}</Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Available Plans -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">{{ t('billing.available_plans') }}</h2>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="plan in plans" :key="plan.key" :class="{ 'border-primary border-2 shadow-md': plan.recommended }">
          <CardHeader class="pb-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <CardTitle class="text-lg">{{ plan.name }}</CardTitle>
                <CardDescription class="text-xs mt-1">{{ plan.description }}</CardDescription>
              </div>
              <Badge v-if="plan.recommended" variant="default" class="flex-shrink-0">{{ t('billing.recommended') }}</Badge>
            </div>
          </CardHeader>
          <CardContent class="space-y-3 pb-3">
            <div class="flex items-baseline gap-1.5">
              <span class="text-2xl font-bold">${{ plan.price }}</span>
              <span class="text-muted-foreground text-xs">/{{ t('billing.month') }}</span>
            </div>
            <Separator />
            <ul class="space-y-1.5">
              <li v-for="(feature, index) in plan.features" :key="index" class="flex items-start gap-2 text-xs">
                <Check class="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                <span class="flex-1">{{ feature }}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter class="pt-3">
            <Button 
              class="w-full" 
              size="sm"
              :variant="plan.key === currentPlanKey ? 'secondary' : 'default'"
              :disabled="plan.key === currentPlanKey"
            >
              {{ plan.key === currentPlanKey ? t('billing.current_plan') : t('billing.upgrade') }}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>

    <!-- Billing History -->
    <Card>
      <CardHeader class="pb-3">
        <CardTitle class="text-lg">{{ t('billing.billing_history') }}</CardTitle>
        <CardDescription class="text-xs">{{ t('billing.billing_history_description') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="invoices.length === 0" class="flex flex-col items-center justify-center py-8 text-center">
          <Calendar class="h-10 w-10 text-muted-foreground mb-3" />
          <p class="font-medium">{{ t('billing.no_invoices') }}</p>
          <p class="text-xs text-muted-foreground mt-1">{{ t('billing.no_invoices_description') }}</p>
        </div>
        <div v-else class="space-y-2">
          <div v-for="invoice in invoices" :key="invoice.id" class="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 transition-colors">
            <div class="flex items-center gap-3">
              <Calendar class="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p class="font-medium text-sm">{{ invoice.id }}</p>
                <p class="text-xs text-muted-foreground">{{ invoice.date }} • {{ invoice.plan }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-medium text-sm">${{ invoice.amount }}</span>
              <Badge :variant="invoice.status === 'paid' ? 'default' : 'secondary'" class="text-xs">
                {{ invoice.status }}
              </Badge>
              <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                <Download class="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
</style>

