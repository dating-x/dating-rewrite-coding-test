<!-- eslint-disable max-len -->
<template>
  <section
    data-testid="landing-mobile"
    class="main-con-wrapper size-full min-h-[800px] from-[#111111] to-[#757171] 2xsm:h-screen 2xsm:max-h-screen lg:bg-gradient-to-b"
  >
    <main
      class="con-wrapper bg-h-screen mx-auto flex h-screen min-h-[800px] flex-col bg-[url('@images/landing-pg-banner.jpg')] bg-no-repeat 2xsm:bg-cover 2xsm:bg-center lg:bg-[length:auto_90%] lg:bg-left-bottom tall-vh:h-full tall-vh:max-h-full tall-vh:min-h-[800px]"
    >
      <div class="flex size-full flex-col items-center justify-center px-[24px]">
        <a data-testid="app-logo" href="/" class="logo-con mb-4 flex items-center">
          <img
            v-cloak
            data-testid="app-logo-img"
            width="293"
            height="55"
            class="img-responsive"
            src="@images/desktop-logo.png"
            alt="Logo"
          />
        </a>

        <StyledLink
          data-testid="register-link-mobile"
          label-classes="font-bold uppercase"
          class="shadow-[0 2px 4px 0 rgba(155, 155, 0.2)] mb-2 flex w-full items-center justify-center rounded border-b-2 border-[#b71919] bg-gradient-to-r from-[#fd307a] to-[#ff3a30] p-[14px] text-white"
          label="Join Free"
          is-anchor
          @click="toggleRegister"
        />

        <StyledLink
          data-testid="login-link"
          link-to="login"
          label-classes="font-bold uppercase"
          class="shadow-[0 2px 4px 0 rgba(155, 155, 0.2)] flex w-full items-center justify-center rounded border-b-2 border-white bg-white p-[14px] text-[#4a4a4a]"
          label="Log in"
        />
      </div>
    </main>

    <section
      v-if="beizerNumberAnimation > -100"
      data-testid="register-card-wrapper"
      :class="['fixed w-full']"
      :style="{ bottom: `${beizerNumberAnimation}%` }"
    >
      <RegisterCard @close="toggleRegister" />
    </section>
  </section>
</template>

<script setup lang="ts">
  import RegisterCard from '@/Partials/Public/Auth/Register/RegisterCard.vue';
  import { useTransition } from '@vueuse/core';

  import { ref } from 'vue';

  import StyledLink from '@/Components/FormElements/StyledLink.vue';

  const duration: number = 900;
  const posNumber = ref(-100);
  const beizerNumberAnimation = useTransition(posNumber, {
    duration,
    transition: [0.75, 0, 0.25, 1],
  });

  const toggleRegister = () => {
    posNumber.value = posNumber.value === -100 ? 0 : -100;
  };
</script>
