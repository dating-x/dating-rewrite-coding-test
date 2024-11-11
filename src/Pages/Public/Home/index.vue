<template>
  <div data-testid="home-parent" class="public-home-parent">
    <component :is="isDesktop ? Desktop : Mobile" />
  </div>
</template>

<script setup lang="ts">
  import Desktop from '@/Pages/Public/Home/Desktop/index.vue';
  import Mobile from '@/Pages/Public/Home/Mobile/index.vue';

  import { computed, onMounted } from 'vue';

  import { useAppStore } from '@/Store/Modules/App';
  import { usePublicHomeStore } from '@/Store/Modules/PublicHome';

  const appStore = useAppStore();
  const publicHomeStore = usePublicHomeStore();

  const isDesktop = computed(() => appStore.isDesktop);

  onMounted(() => {
    publicHomeStore.fetchOnlineProfiles();
  });
</script>
