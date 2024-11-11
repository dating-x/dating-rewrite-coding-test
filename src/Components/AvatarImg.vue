<template>
  <LazyImg
    data-testid="avatar-img"
    :src="image?.thumb_url"
    :fallback-src="fallbackSrcLocal"
    :wrapper-classes="wrapperClasses"
    :img-classes="imgClasses"
  />
</template>

<script setup lang="ts">
  import maleImageUrl from '@images/male.png';

  import { PropType, computed } from 'vue';

  import type { ImageApiDTO } from '@/Types/Responses';

  import LazyImg from '@/Components/LazyImg.vue';

  const props = defineProps({
    image: {
      type: Object as PropType<ImageApiDTO | null>,
      default: null,
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

    profileSex: {
      type: Number as PropType<Nullable<Number>>,
      default: null,
    },

    isPreview: {
      type: Boolean,
      default: false,
    },
  });

  // if fallback url does not exist, we want to display a default avatar picture
  const fallbackSrcLocal = computed(() => {
    if (props.fallbackSrc !== '') {
      return props.fallbackSrc;
    }

    return maleImageUrl;
  });
</script>
