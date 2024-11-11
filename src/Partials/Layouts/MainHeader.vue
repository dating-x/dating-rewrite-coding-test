<template>
  <header
    v-if="isDesktop"
    data-testid="main-header-d"
    :class="['main-header px-2.5 py-5', { 'bg-[#3a3b3f] pb-0': !landing }]"
  >
    <div :class="['main-header--wrapper flex justify-between', { 'mx-auto w-[1170px] bg-[#3a3b3f]': !landing }]">
      <router-link :to="{ name: 'home' }" class="logo-con flex items-center">
        <img v-cloak data-testid="app-logo" class="img-responsive" src="@images/desktop-logo.png" alt="Logo" />
      </router-link>
      <div class="login-con flex items-center justify-center">
        <p class="mr-4 text-sm text-[#fff]">
          {{ $t('Already a member?') }}
        </p>

        <StyledLink
          data-testid="main-header-login"
          link-to="home"
          label-classes="font-medium"
          class="my-2.5 flex items-center justify-between rounded border border-solid px-4 py-2 text-sm text-[#fff] transition-all hover:border-transparent hover:bg-default"
          :label="$t('Login')"
        >
          <template #icon>
            <img src="@images/login-icon.png" alt="dating-login" class="ml-[5px]" />
          </template>
        </StyledLink>
      </div>
    </div>

    <nav v-if="!landing && landingSubs" class="mx-auto mt-5 w-[1170px] border-t border-[#9e9e9e]">
      <BaseMenu
        data-testid="default-sub-menu"
        item-label-classes="font-medium"
        item-link-classes="p-2 inline-block text-white"
        item-wrap-classes=""
        class="flex justify-center"
        :menu-list="subMenu"
      />
    </nav>

    <menu v-if="!!slots['subMenuSlot']">
      <nav :class="`w-[1170px] mx-auto mt-5 ${subMenuSlotClasses}`">
        <slot name="subMenuSlot" />
      </nav>
    </menu>
  </header>

  <header
    v-if="!isDesktop"
    data-testid="main-header-m"
    :class="`${
      headerLight ? 'bg-white' : 'bg-[#eeeff4]'
    } relative mobile-top-bar shadow-[2px_2px_2px_#ddd] min-h-[70px] max-h-[70px] flex justify-center items-center`"
  >
    <a data-testid="header-back-btn" class="absolute left-[15px] top-[28px]" @click="$router.go(-1)">
      <i class="icon pos-left icon-left-arrow" />
    </a>
    <h1 class="max-w-[80vw] truncate text-center text-2xl uppercase">
      {{ pageTitle }}
    </h1>
  </header>
</template>

<script setup lang="ts">
  import i18n from '@/Services/I18n';

  import { computed, ref, useSlots } from 'vue';

  import type { MenuItem } from '@/Types/Components';

  import { useAppStore } from '@/Store/Modules/App';

  import BaseMenu from '@/Components/BaseMenu.vue';
  import StyledLink from '@/Components/FormElements/StyledLink.vue';

  defineProps({
    landing: {
      type: Boolean,
      default: false,
    },

    landingSubs: {
      type: Boolean,
      default: false,
    },

    subMenuSlotClasses: {
      type: String,
      default: '',
    },

    headerLight: {
      type: Boolean,
      default: false,
    },

    pageTitle: {
      type: String,
      default: '',
    },

    credits: {
      type: Number,
      default: 2,
    },
  });

  const emit = defineEmits(['logout']);

  const appStore = useAppStore();
  const slots = useSlots();

  const subMenu = ref<MenuItem[]>([
    { name: i18n.global.t('Home'), route: 'home' },
    { name: i18n.global.t('FAQ'), route: 'home' },
    { name: i18n.global.t('Blog'), route: 'home' },
    { name: i18n.global.t('Contact'), route: 'home' },
  ]);

  const isDesktop = computed(() => appStore.isDesktop);

  const handleLogout = async () => {
    emit('logout');
  };
</script>
