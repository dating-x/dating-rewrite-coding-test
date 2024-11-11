<template>
  <menu data-testid="base-menu" class="base-menu">
    <nav v-for="(list, idx) in menuList" :key="idx" :class="`base-menu-li ${itemWrapClasses}`">
      <StyledLink
        data-testid="base-menu-styled-link"
        :link-to="list.externalRoute ? list.externalRoute : list.route"
        :is-anchor="!!list.externalRoute || !!list.emitter"
        :class="[itemLinkClasses]"
        :params="list?.params"
        @click="list.emitter ? $emit(list.emitter) : openLink(list.externalRoute, Boolean(list.isExternal))"
      >
        <aside
          v-if="list.iconClasses"
          data-testid="icon-l-content"
          :class="[`base-menu--icon ${itemLeftContentClasses}`]"
        >
          <i data-testid="icon-left" :class="`icon relative ${list.iconClasses} ${iconClasses}`">
            <aside
              v-if="list.rightContent && !isDesktop"
              data-testid="r-content-m"
              :class="`${itemRightContentClasses}`"
            >
              {{ list.rightContent }}
            </aside>
          </i>
        </aside>
        {{ list.name }}
        <aside v-if="list.rightContent && isDesktop" data-testid="r-content-d" :class="`${itemRightContentClasses}`">
          {{ list.rightContent }}
        </aside>
      </StyledLink>
    </nav>
  </menu>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import type { MenuItem } from '@/Types/Components';

  import { useAppStore } from '@/Store/Modules/App';

  import StyledLink from '@/Components/FormElements/StyledLink.vue';

  defineProps({
    menuList: {
      type: Object as () => MenuItem[],
      required: true,
    },

    itemLinkClasses: {
      type: String,
      default: '',
    },

    itemWrapClasses: {
      type: String,
      default: '',
    },

    itemRightContentClasses: {
      type: String,
      default: '',
    },

    itemLeftContentClasses: {
      type: String,
      default: '',
    },

    iconClasses: {
      type: String,
      default: '',
    },
  });

  const appStore = useAppStore();

  const isDesktop = computed(() => appStore.isDesktop);
  const openLink = (url: string | undefined, newTab: boolean) => {
    if (url === null || url === undefined || url === '') return;
    newTab ? window.open(url, '_blank', 'noreferrer') : (window.location.href = url);
  };
</script>
