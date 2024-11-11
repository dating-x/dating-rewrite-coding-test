<template>
  <section data-testid="default-layout" class="default-layout">
    <MainHeader v-if="!isDesktop && mobileTitle" :page-title="mobileTitle" />
    <router-view v-slot="{ Component }">
      <Transition name="fade-route" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>

    <MainFooter />
  </section>
</template>

<script setup lang="ts">
  import MainFooter from '@/Partials/Layouts/MainFooter.vue';
  import MainHeader from '@/Partials/Layouts/MainHeader.vue';
  import { useRoute } from 'vue-router';

  import { computed } from 'vue';

  import { useAppStore } from '@/Store/Modules/App';

  const route = useRoute();
  const appStore = useAppStore();
  const isDesktop = computed(() => appStore.isDesktop);
  const mobileTitle = computed(() => route.meta.mobileTitle as string);
</script>
