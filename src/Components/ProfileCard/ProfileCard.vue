<template>
  <div data-testid="profile-card">
    <component
      :is="components[type]"
      data-testid="profile-link"
      v-bind="{
        title: profile.title ?? profile?.nick_name ?? '',
        image: profile?.profile_image,
        imgAlt: `Avatar of ${profile?.nick_name}`,
        isFavorited: profile?.is_favorited,
        isPremium: profile?.premium,
      }"
      :with-action="visibleActionIcons"
      @favorite="emit('favorite', profile.hash_id)"
      @view="goToProfilePage(profile.nick_name, profile.hash_id)"
      @message="goToMessagePage(profile.nick_name)"
      @upgrade="goToPremiumPage"
    >
      <template #description>
        <slot name="description" />
      </template>
      <slot />
    </component>
  </div>
</template>

<script lang="ts">
  import { type Component, type PropType, computed } from 'vue';
  import type { Profile } from '@/Types/Components';
  import ClassicProfileCard from './ClassicProfileCard.vue';

  const components: Component = {
    classic: ClassicProfileCard,
  };
</script>

<script lang="ts" setup>
  const props = defineProps({
    type: {
      type: String,
      default: 'classic',
      validator: (value: string) => Object.keys(components).includes(value),
    },

    profile: {
      type: Object as PropType<Profile | any>,
      required: true,
    },

    showFavoriteIcon: {
      type: Boolean,
      default: false,
    },

    showViewIcon: {
      type: Boolean,
      default: false,
    },

    showMessageIcon: {
      type: Boolean,
      default: false,
    },

    showUpgradeIcon: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['favorite']);

  const visibleActionIcons = computed(() => ({
    upgrade: props.showUpgradeIcon && props.profile.has_active_premium,
    view: props.showViewIcon,
    favorite: props.showFavoriteIcon && props.profile.allow_favorites,
    message: props.showMessageIcon,
  }));

  const goToPremiumPage = () => {
    // redirect
  };

  const goToProfilePage = (nickName: string, profileId: string) => {
    if (nickName === null || profileId === null) return;
    // redirect
  };

  const goToMessagePage = (nickName: string) => {
    // redirect
  };
</script>
