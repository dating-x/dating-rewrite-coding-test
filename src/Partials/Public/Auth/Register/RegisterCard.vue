<template>
  <div data-testid="register-card-main" class="register-card">
    <span
      v-if="!isDesktop"
      data-testid="register-card-close"
      title="close"
      :class="[
        `absolute right-[15px] flex size-[24px] cursor-pointer items-center justify-center text-2xs font-bold text-zinc-300 hover:text-[#696969]`,
      ]"
      @click.prevent.stop="handleClose"
    >
      <i class="icon icon-round-close size-[40px] min-w-[40px]" />
    </span>

    <div
      class="register-card--inner mx-[0] bg-[#f7f7f7] px-6 pb-8 pt-6 text-center leading-default 2xsm:max-w-full 2xsm:pb-[50px] 2xsm:pt-[36px] lg:mb-13 lg:mt-[40px] lg:max-w-[560px] lg:rounded-br-[30px] lg:rounded-tl-[30px]"
    >
      <h1 v-if="isDesktop" class="mb-1.5 font-medium leading-default">
        {{ appContent.registration_box_title }}
      </h1>
      <h5 v-if="isDesktop" class="mb-7 font-light leading-default text-[#3a3b3f]">
        {{ appContent.registration_box_slogan }}
      </h5>

      <form action="#">
        <div class="lg:item-center mb-4 lg:mb-2.5 lg:flex lg:justify-center">
          <StyledSelect
            v-model="sexSeeking"
            data-testid="sex-seeking-select"
            :label="$t('I am a')"
            label-for="sex-seeking"
            name="sex-seeking"
            :options="sexSeekingOptions"
            :label-position="isDesktop ? 'left' : 'top'"
            custom-label-class="lg:w-[100px]"
            custom-wrapper-class="lg:w-[280px]"
          />
        </div>
        <div class="lg:item-center mb-6 lg:mb-2.5 lg:flex lg:justify-center">
          <StyledSelect
            v-model="location"
            label="Province"
            data-testid="location-select"
            name="location"
            :options="provincesOptions"
            :label-position="isDesktop ? 'left' : 'top'"
            custom-label-class="lg:w-[100px]"
            custom-wrapper-class="lg:w-[280px]"
          />
        </div>
        <div
          class="form-group flex 2xsm:mb-5 2xsm:flex-col 2xsm:items-start 2xsm:justify-start lg:flex-row lg:items-center lg:justify-center"
        >
          <StyledLink
            data-testid="register-submit"
            label-classes="font-bold uppercase"
            class="shadow-[0 2px 4px 0 rgba(155, 155, 0.2)] flex w-full items-center justify-center rounded border-b-2 border-[#b71919] bg-gradient-to-r from-[#fd307a] to-[#ff3a30] p-[14px] text-white lg:ml-[100px] lg:max-w-[280px]"
            :label="appContent.registration_box_button"
            is-anchor
            @click="toContinueRegister"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  import { computed, onMounted, ref } from 'vue';

  import { useAppStore } from '@/Store/Modules/App';
  import { useAuthStore } from '@/Store/Modules/Auth';
  import { useConstantsStore } from '@/Store/Modules/Constants';

  import StyledLink from '@/Components/FormElements/StyledLink.vue';
  import StyledSelect from '@/Components/FormElements/StyledSelect.vue';

  const emit = defineEmits(['close']);

  const authStore = useAuthStore();
  const constantsStore = useConstantsStore();
  const defaultSelectedProvince = computed(() => authStore.defaultProvince);
  const defaultSexSeekingValue = computed(() => constantsStore.defaultSexSeekingValue);
  const sexSeekingOptions = computed(() => constantsStore.sexSeekingOptions);
  const provincesOptions = computed(() => authStore.provincesOptions);

  const sexSeeking = ref<string>(defaultSexSeekingValue.value);
  const location = ref<number>(0);

  const appStore = useAppStore();
  const isDesktop = computed(() => appStore.isDesktop);
  const appContent = computed(() => appStore.appContent);

  const handleClose = () => emit('close');
  const router = useRouter();
  const toContinueRegister = () => {
    // empty function
  };

  onMounted(async () => {
    await authStore.fetchProvinces();
    location.value = defaultSelectedProvince.value != null ? defaultSelectedProvince.value.id : 0;
  });
</script>
