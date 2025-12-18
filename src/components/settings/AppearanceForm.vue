<script setup lang="ts">
import { cn } from '@/lib/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { h } from 'vue';
import * as z from 'zod';
import { buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { useColorMode } from '@vueuse/core';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroupItem } from 'radix-vue';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';
import RadioGroup from '../ui/radio-group/RadioGroup.vue';
import { useI18n } from 'vue-i18n';
import { setLocale } from '@/plugins/i18n';

const appearanceFormSchema = toTypedSchema(
  z.object({
    theme: z.enum(['light', 'dark'], {
      required_error: 'Please select a theme.',
    }),
    language: z.enum(['en', 'fr'], {
      required_error: 'Please select a language.',
    }),
  })
);

const { t } = useI18n();

const { handleSubmit } = useForm({
  validationSchema: appearanceFormSchema,
  initialValues: {
    theme: 'light',
    language: (localStorage.getItem('locale') as 'en' | 'fr') || 'en',
  },
});

const color = useColorMode();

const onSubmit = handleSubmit((values) => {
  if (values.language) {
    setLocale(values.language);
  }
  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))
    ),
  });
});
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      {{ t('settings.appearance.title') }}
    </h3>
    <p class="text-sm text-muted-foreground">
      {{ t('settings.appearance.description') }}
    </p>
  </div>
  <Separator />
  <form class="space-y-8" @submit="onSubmit">

    <FormField v-slot="{ field }" name="language">
      <FormItem>
        <FormLabel>{{ t('settings.appearance.language.label') }}</FormLabel>
        <div class="relative w-[200px]">
          <FormControl>
            <select
              :class="
                cn(
                  buttonVariants({ variant: 'outline' }),
                  'w-[200px] appearance-none font-normal cursor-pointer'
                )
              "
              v-bind="field"
            >
              <option value="en" class="cursor-pointer">
                {{ t('settings.appearance.language.en') }}
              </option>
              <option value="fr" class="cursor-pointer">
                {{ t('settings.appearance.language.fr') }}
              </option>
            </select>
          </FormControl>
          <ChevronDown
            class="pointer-events-none absolute right-2 top-2 h-4 w-4"
          />
        </div>
        <FormDescription>
          {{ t('settings.appearance.language.description') }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" type="radio" name="theme">
      <FormItem class="space-y-1">
        <FormLabel>{{ t('settings.appearance.theme.label') }}</FormLabel>
        <FormDescription>
          {{ t('settings.appearance.theme.description') }}
        </FormDescription>
        <FormMessage />

        <RadioGroup
          class="grid grid-cols-2 max-w-md gap-8 pt-2"
          v-bind="componentField"
        >
          <FormItem>
            <FormLabel>
              <FormControl>
                <RadioGroupItem
                  value="light"
                  class="sr-only"
                  @click="color = 'light'"
                />
              </FormControl>
              <div
                class="items-center border-2 border-muted rounded-md p-1 hover:bg-accent"
                :class="color === 'light' ? 'border-accent' : ''"
              >
                <div class="rounded-sm bg-[#ecedef] p-2 space-y-2">
                  <div class="rounded-md bg-white p-2 shadow-sm space-y-2">
                    <div class="h-2 w-20 rounded-lg bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div
                    class="flex items-center rounded-md bg-white p-2 shadow-sm space-x-2"
                  >
                    <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div
                    class="flex items-center rounded-md bg-white p-2 shadow-sm space-x-2"
                  >
                    <div class="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span class="block w-full p-2 text-center font-normal">
                {{ t('settings.appearance.theme.light') }}
              </span>
            </FormLabel>
          </FormItem>
          <FormItem>
            <FormLabel>
              <FormControl>
                <RadioGroupItem
                  value="dark"
                  class="sr-only"
                  @click="color = 'dark'"
                />
              </FormControl>
              <div
                class="items-center border-2 border-muted rounded-md bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
                :class="color === 'dark' ? 'border-accent' : ''"
              >
                <div class="rounded-sm bg-slate-950 p-2 space-y-2">
                  <div class="rounded-md bg-slate-800 p-2 shadow-sm space-y-2">
                    <div class="h-2 w-20 rounded-lg bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div
                    class="flex items-center rounded-md bg-slate-800 p-2 shadow-sm space-x-2"
                  >
                    <div class="h-4 w-4 rounded-full bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div
                    class="flex items-center rounded-md bg-slate-800 p-2 shadow-sm space-x-2"
                  >
                    <div class="h-4 w-4 rounded-full bg-slate-400" />
                    <div class="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span class="block w-full p-2 text-center font-normal">
                {{ t('settings.appearance.theme.dark') }}
              </span>
            </FormLabel>
          </FormItem>
        </RadioGroup>
      </FormItem>
    </FormField>

    <div class="flex justify-start">
      <Button type="submit" class="bg-accent text-accent-foreground hover:bg-accent/90">
        {{ t('common.update') }}
      </Button>
    </div>
  </form>
</template>
