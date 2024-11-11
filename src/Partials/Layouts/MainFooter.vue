<template>
  <div data-testid="main-footer" class="main-footer border-t border-white p-[30px] 2xsm:bg-black lg:bg-[#3a3b3f]">
    <template v-if="isDesktop">
      <div class="main-footer-wrapper grid grid-cols-3 gap-4">
        <div class="logo-con">
          <styled-link data-testid="footer-logo" :href="'/'">
            <img class="img-responsive" src="@images/desktop-footer-logo.png" alt="Logo" />
          </styled-link>

          <p class="mt-[25px]">
            {{ appContent.footer_text }}
          </p>

          <div
            data-testid="payment-gateways"
            class="main-footer--gateway-icons flex items-center justify-start py-[25px]"
          >
            <img class="visa mr-2.5" src="@images/footer-icons/visa-white.png" width="70" alt="visa" />
            <img class="mastercard" src="@images/footer-icons/mastercard.png" width="70" alt="mastercard" />
          </div>
        </div>
        <div class="">
          <h3 class="py-[10px] text-8xl leading-extra-tight">{{ 'Information' }}</h3>
          <base-menu
            data-testid="footer-links"
            class="sub-menu mt-[19px]"
            item-link-classes="pt-[5px] pb-[1px] flex text-white transition-all ease-in-out duration-300 hover:pl-[10px] hover:bg-[#b2153a]"
            item-wrap-classes="border-b border-[#6b6d74]"
            :menu-list="desktopLeftMenu"
          />
        </div>
        <div>
          <div class="cp-text px-0 pb-[18px] pt-[10px] text-right">
            <p>
              Copyright © {{ currentYear }}
              <b class="font-bold">{{ siteName }}</b>
            </p>
            <p>{{ 'All rights reserved.' }}</p>
          </div>
          <base-menu
            data-testid="footer-links"
            class="sub-menu"
            item-link-classes="pt-[5px] pb-[1px] flex text-white transition-all ease-in-out duration-300 hover:pl-[10px] hover:bg-[#b2153a]"
            item-wrap-classes="border-b border-[#6b6d74]"
            :menu-list="desktopRightMenu"
          />
        </div>
      </div>
    </template>

    <template v-else-if="isTabletMobile">
      <div class="main-footer-wrapper grid grid-cols-3 gap-4 p-[20px_15px]">
        <base-menu
          data-testid="footer-links"
          class="sub-menu flex flex-col"
          item-link-classes="font-medium text-[14px] px-[8px] flex text-white transition-all ease-in-out delay-100 duration-300"
          item-wrap-classes="flex items-center leading-semi-loose min-h-[70px]"
          :menu-list="tabletLeftMenu"
        />
        <base-menu
          data-testid="footer-links"
          class="sub-menu flex flex-col items-center"
          item-link-classes="font-medium text-[14px] px-[8px] flex text-white transition-all ease-in-out delay-100 duration-300"
          item-wrap-classes="flex items-center leading-semi-loose min-h-[70px]"
          :menu-list="tabletMiddleMenu"
        />
        <base-menu
          data-testid="footer-links"
          class="sub-menu flex flex-col items-end justify-end"
          item-link-classes="font-medium text-[14px] px-[8px] flex text-white transition-all ease-in-out delay-100 duration-300 hover:pl-[10px] hover:bg-[#b2153a]"
          item-wrap-classes="flex items-center leading-semi-loose min-h-[70px]"
          :menu-list="tabletRightMenu"
        />
      </div>
    </template>

    <template v-else>
      <div class="main-footer-wrapper flex justify-center p-[20px_15px]">
        <base-menu
          data-testid="footer-links"
          class="sub-menu flex flex-col items-center"
          item-link-classes="font-medium text-[14px] px-[8px] my-[20px] flex text-white transition-all ease-in-out delay-100 duration-300 lg:hover:pl-[10px] lg:hover:bg-[#b2153a]"
          item-wrap-classes="text-left leading-semi-loose w-full"
          :menu-list="mobileMenu"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import i18n from '@/Services/I18n';

  import { computed, ref } from 'vue';

  import type { FooterLink, MenuItem } from '@/Types/Components';

  import { useAppStore } from '@/Store/Modules/App';

  import BaseMenu from '@/Components/BaseMenu.vue';
  import StyledLink from '@/Components/FormElements/StyledLink.vue';

  const appStore = useAppStore();

  const appContent = computed(() => appStore.appContent);

  const dynamicMenuList = computed(() => {
    const footerLinks = appContent.value.footer_links as FooterLink[];
    if (footerLinks === null || footerLinks.length <= 0) return [];
    return footerLinks.map((item: FooterLink) => ({
      name: item.title,
      externalRoute: item.url,
      isExternal: true,
    }));
  });

  const leftMenu: MenuItem[] = [{ name: i18n.global.t('Support'), route: 'home' }, ...dynamicMenuList.value];

  const rightMenu: MenuItem[] = [
    { name: i18n.global.t('Cookies'), route: 'home', params: { name: 'cookies' } },
    { name: i18n.global.t('Privacy'), route: 'home', params: { name: 'privacy' } },
    { name: 'FAQ', route: 'home' },
    { name: i18n.global.t('Terms'), route: 'home', params: { name: 'terms' } },
  ];

  // desktop

  const desktopLeftMenu = ref<MenuItem[]>(leftMenu);
  const desktopRightMenu = ref<MenuItem[]>(rightMenu);

  // tablet

  const tabletLeftMenu = ref<MenuItem[]>([
    { name: i18n.global.t('Support'), route: 'home' },
    { name: 'FAQ', route: 'home' },
  ]);

  const tabletMiddleMenu = ref<MenuItem[]>([
    { name: i18n.global.t('Terms'), route: 'home', params: { name: 'terms' } },
    { name: i18n.global.t('Privacy'), route: 'home', params: { name: 'privacy' } },
    { name: i18n.global.t('Cookies'), route: 'home', params: { name: 'cookies' } },
  ]);

  const tabletRightMenu = ref<MenuItem[]>(dynamicMenuList.value);

  // mobile

  const mobileMenu = ref<MenuItem[]>([...leftMenu, ...rightMenu]);

  // other

  const siteName = computed(() => appStore.appConfig.domainName);
  const currentYear = new Date().getFullYear();

  const isDesktop = computed(() => appStore.isDesktop);
  const isTabletMobile = computed(() => appStore.isTabletMobile);
</script>

<style lang="scss" scoped>
  .main-footer {
    color: #fff;
    &-wrapper {
      max-width: 1170px;
      margin: 0 auto;
    }
  }
</style>
