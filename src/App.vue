<template>
  <section class="app-main">
    <router-view />
  </section>
</template>

<script setup lang="ts">
  import { useWindowSize } from '@vueuse/core';
  import { watchEffect } from 'vue';
  import { useAppStore } from '@/Store/Modules/App';

  const appStore = useAppStore();
  const { width, height } = useWindowSize();

  watchEffect(() => appStore.setWindowSize(width.value, height.value));

  appStore.setAppConfig(window.appConfig);
</script>

<style>
  @import '@sass/app.scss';
</style>
