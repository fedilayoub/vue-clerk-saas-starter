<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSidebar } from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-vue-next';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import {
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const props = defineProps<{
  item: {
    title: string;
    icon: any;
  };
}>();

const { t } = useI18n();
const { state, toggleSidebar } = useSidebar();

const handleClick = (e: Event) => {
  if (state.value === 'collapsed') {
    e.preventDefault();
    toggleSidebar();
  }
};
</script>

<template>
  <CollapsibleTrigger as-child>
    <SidebarMenuButton 
      :tooltip="t(`navigation.${props.item.title.toLowerCase()}`)"
      @click="handleClick"
    >
      <component :is="props.item.icon" />
      <span>{{ t(`navigation.${props.item.title.toLowerCase()}`) }}</span>
      <ChevronRight
        class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
      />
    </SidebarMenuButton>
  </CollapsibleTrigger>
</template> 