<template>
  <div
    data-testid="lazy-img-wrapper"
    :class="[`lazy-image lazy-image--wrapper relative w-full bg-[#00000014] ${wrapperClasses}`]"
  >
    <img ref="lazyImgRef" data-testid="lazy-img" :class="`image h-full object-cover min-w-full ${imgClasses}`" />
    <span v-if="isLoading" data-testid="lazy-img-loader" class="loader max-w-full" />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useLazyload } from 'vue3-lazyload';

  const props = defineProps({
    src: {
      type: String,
      default: '',
    },

    fallbackSrc: {
      type: String,
      default: '',
    },

    wrapperClasses: {
      type: String,
      default: '',
    },

    imgClasses: {
      type: String,
      default: '',
    },
  });

  const imgSrc = ref(props.src);
  const isLoading = ref<Boolean>(false);
  const didImageFallback = ref(false);

  // we'll start the fallback count after the image started loading, and
  // the fallback src is available
  watch(
    () => [isLoading.value, props.fallbackSrc],
    () => {
      if (isLoading.value === true && props.fallbackSrc !== '') {
        startFallbackTimeout();
      }
    },
    { immediate: true },
  );

  const lazyImgRef = useLazyload(imgSrc, {
    lifecycle: {
      loading: () => {
        isLoading.value = true;
      },
      error: () => {
        replaceImageSrc(props.fallbackSrc);
      },
      loaded: () => {
        if (didImageFallback.value) {
          imgSrc.value = props.src;
        }

        isLoading.value = false;
      },
    },
  });

  // if the image is still null after the grace time, we'll
  // replace if with a fallback url (it can still change back to the
  // proper image in case if loading takes too long and it loads later)
  const startFallbackTimeout = () => {
    setTimeout(() => {
      didImageFallback.value = true;

      if (isLoading.value === true && props.fallbackSrc !== '') {
        replaceImageSrc(props.fallbackSrc);
      }
    }, FALLBACK_GRACE_PERIOD_MS);
  };

  watch(
    () => props.src,
    (value) => {
      replaceImageSrc(value !== '' ? value : props.fallbackSrc);
    },
  );

  const replaceImageSrc = (src: string) => {
    isLoading.value = false;
    lazyImgRef?.value?.setAttribute('src', src);
  };
</script>

<script lang="ts">
  // maximum time we will allow for the image to load, before
  // we load the fallback image manually
  const FALLBACK_GRACE_PERIOD_MS = 1000;
</script>

<style lang="scss">
  .image {
    display: block;
  }

  .image[lazy='loading'] {
    background: #eee;
  }

  .image[lazy='loaded'] {
    background: white;
  }
</style>
