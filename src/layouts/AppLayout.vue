<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import {
  Collapsible,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarLogo,
} from '@/components/ui/sidebar';
import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  PieChart,
  Settings2,
  Sparkles,
  SquareTerminal,
} from 'lucide-vue-next';
import Logout from '@/components/Logout.vue';
import { useUser } from '@clerk/vue';
import { useI18n } from 'vue-i18n';
import NavItem from '@/components/NavItem.vue';
import { Switch } from '@/components/ui/switch';
import { useColorMode } from '@vueuse/core';
import { computed } from 'vue';
import { Moon, Sun } from 'lucide-vue-next';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const { user } = useUser();
const { t } = useI18n();

const mode = useColorMode();
const isDark = computed({
  get: () => mode.value === 'dark',
  set: (value) => {
    mode.value = value ? 'dark' : 'light';
  },
});

// This is sample data.
const data = {
  user: {
    name: 'Example',
    email: 'example@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: 'Profile',
          url: '/app/settings/profile',
        },

        {
          title: 'Appearance',
          url: '/app/settings/appearance',
        },
      ],
    },
  ],
};

function getInitials(fullName: string): string {
  const names = fullName.split(' ');
  const initials = names.map((name) => name[0]);
  return initials.join('').toUpperCase();
}

</script>

<template>
  <SidebarProvider :default-open="false">
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <router-link to="/">
            <SidebarLogo />
          </router-link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <router-link to="/app/dashboard" :class="{ 'text-accent': $route.path === '/app/dashboard' }">
                <SidebarMenuButton :tooltip="t('navigation.dashboard')">
                  <PieChart />
                  <span>{{ t('navigation.dashboard') }}</span>
                </SidebarMenuButton>
              </router-link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <router-link to="/app/page-one" :class="{ 'text-accent': $route.path === '/app/page-one' }">
                <SidebarMenuButton :tooltip="t('pages.page_one')">
                  <SquareTerminal />
                  <span>{{ t('pages.page_one') }}</span>
                </SidebarMenuButton>
              </router-link>
            </SidebarMenuItem>
            <Collapsible v-for="item in data.navMain" :key="item.title" as-child :default-open="item.isActive"
              class="group/collapsible">
              <SidebarMenuItem>
                <NavItem :item="item" />
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                      <SidebarMenuSubButton as-child>
                        <router-link :to="subItem.url" :class="{
                          'text-accent': $route.path === subItem.url,
                        }">
                          <span>{{ t(`navigation.${subItem.title.toLowerCase()}`) }}</span>
                        </router-link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarFallback class="rounded-lg">
                      {{ user?.fullName ? getInitials(user?.fullName) : 'AB' }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{
                      user?.fullName
                    }}</span>
                    <span class="truncate text-xs">{{
                      user?.primaryEmailAddress?.emailAddress
                    }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom"
                align="end" :side-offset="4">
                <DropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarFallback class="rounded-lg">
                        {{
                          user?.fullName ? getInitials(user?.fullName) : 'AB'
                        }}
                      </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{
                        user?.fullName
                      }}</span>
                      <span class="truncate text-xs">{{
                        user?.primaryEmailAddress?.emailAddress
                      }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <router-link to="/app/billing" class="cursor-pointer">
                    <DropdownMenuItem class="cursor-pointer">
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </router-link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <router-link to="/app/settings/profile" class="cursor-pointer">
                    <DropdownMenuItem class="cursor-pointer">
                      <BadgeCheck />
                      {{ t('settings.profile.title') }}
                    </DropdownMenuItem>
                  </router-link>
                  <router-link to="/app/billing" class="cursor-pointer">
                    <DropdownMenuItem class="cursor-pointer">
                      <CreditCard />
                      {{ t('billing.title') }}
                    </DropdownMenuItem>
                  </router-link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Logout />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
        </div>
        <div class="flex items-center gap-2 px-4">
          <LanguageSwitcher />
          <Separator orientation="vertical" class="h-4" />
          <Sun class="h-3.5 w-3.5 text-muted-foreground" />
          <Switch v-model:checked="isDark" class="scale-75" />
          <Moon class="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </header>
      <div
        class="relative flex flex-1 flex-col gap-4 p-4 pt-0 bg-[linear-gradient(6.6deg,rgba(192,132,252,0)_20.79%,rgba(95,251,23,0.1)_40.92%,rgba(204,171,238,0)_70.35%)]">
        <router-view></router-view>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
