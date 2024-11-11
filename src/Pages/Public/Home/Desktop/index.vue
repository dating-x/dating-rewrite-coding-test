<template>
  <div
    ref="heroSection"
    data-testid="landing-desktop"
    class="main-con-wrapper h-screen min-h-[800px] w-full bg-gradient-to-b from-[#111111] to-[#757171] tall-vh:h-full tall-vh:max-h-full tall-vh:min-h-[800px]"
  >
    <div
      class="con-wrapper mx-auto flex h-screen min-h-[800px] w-[1170px] flex-col bg-[url('@images/models-banner-desktop.png')] bg-[length:auto_90%] bg-left-bottom bg-no-repeat tall-vh:h-full tall-vh:max-h-full tall-vh:min-h-[800px]"
    >
      <MainHeader landing />
      <div class="banner-wrapper flex flex-1 items-center">
        <div class="w-50 rg-card-con min-w-xl ml-auto max-w-xl flex-auto">
          <RegisterCard />
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="onlineProfiles"
    data-testid="profile-list-wrapper"
    class="home--profile-list-wrapper home--body-width bg-white py-8"
  >
    <div class="grid grid-cols-6 gap-4" data-testid="profile-list">
      <ProfileCard v-for="(profile, index) in onlineProfiles" :key="index" :profile="profile" type="classic">
        <template #description>
          <span class="text-primary">{{ profile.age }} {{ $t('years old') }}</span>
        </template>
      </ProfileCard>
    </div>
  </div>

  <div data-testid="find-match-section" class="home--find-members-wrapper py-[85px] text-center">
    <h2 class="text-20xl leading-normal text-white">
      {{ appContent.mid_section_title }}
    </h2>

    <p class="mb-10 text-center text-white">
      {{ appContent.mid_section_slogan }}
    </p>

    <div class="flex justify-center">
      <StyledLink
        data-testid="register-link"
        label-classes="font-normal uppercase"
        class="shadow-[0 2px 4px 0 rgba(155, 155, 0.2)] flex w-full max-w-[280px] items-center justify-center rounded border-[#b71919] bg-default p-[14px] text-white transition delay-150 ease-in-out hover:scale-110 hover:bg-[#7f0007]"
        :label="appContent.mid_section_button"
        is-anchor
        @click="scrollToRegister"
      />
    </div>
  </div>

  <div data-testid="statements-section" class="home--statements-wrapper home--body-width bg-white py-[45px]">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h2 class="mb-4 text-12xl text-[#D93C61]">
          {{ appContent.content_left_title }}
        </h2>
        <p class="mb-3.5">
          {{ appContent.content_left_text }}
        </p>

        <StyledLink
          data-testid="register-link"
          label-classes="font-normal capitalize underline text-[#D93C61]"
          class="border-[#b71919]"
          :label="appContent.content_left_button"
          is-anchor
          @click="scrollToRegister"
        />
      </div>

      <div>
        <h2 class="mb-4 text-12xl text-[#D93C61]">
          {{ appContent.content_right_title }}
        </h2>
        <p class="mb-3.5">
          {{ appContent.content_right_text }}
        </p>

        <StyledLink
          data-testid="register-link"
          label-classes="font-normal capitalize underline text-[#D93C61]"
          class="border-[#b71919]"
          :label="appContent.content_right_button"
          is-anchor
          @click="scrollToRegister"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import MainHeader from '@/Partials/Layouts/MainHeader.vue';
  import RegisterCard from '@/Partials/Public/Auth/Register/RegisterCard.vue';

  import { computed, ref } from 'vue';

  import { useAppStore } from '@/Store/Modules/App';
  import { usePublicHomeStore } from '@/Store/Modules/PublicHome';

  import StyledLink from '@/Components/FormElements/StyledLink.vue';
  import ProfileCard from '@/Components/ProfileCard/ProfileCard.vue';

  const appStore = useAppStore();
  const publicHomeStore = usePublicHomeStore();

  const appContent = computed(() => appStore?.appContent);
  const onlineProfiles = computed(() => publicHomeStore.onlineProfiles);
  const heroSection = ref<HTMLElement | null>(null);
  const scrollToRegister = () => {
    heroSection.value?.scrollIntoView({ behavior: 'smooth' });
  };
</script>

<style lang="scss" scoped>
  .home {
    &--body-width {
      max-width: 1170px;
      margin: 0 auto;
    }
    .profile-card-list {
      margin: 0 auto;
    }

    &--find-members-wrapper {
      background-image: url('@images/find-members.jpeg');
      background-size: cover;
    }
  }
</style>
