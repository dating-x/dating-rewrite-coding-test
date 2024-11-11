<template>
  <component
    :is="component"
    data-testid="styled-link"
    v-bind="$attrs"
    :to="{ name: linkTo, params: params }"
    :class="['styled-link']"
    :href="isAnchor ? linkTo : `/${linkTo}`"
    @click.prevent.stop="emit('click')"
  >
    <template v-if="!!slots.default">
      <slot />
    </template>

    <template v-else>
      <p v-if="label" :class="[`styled-link--label ${labelClasses}`]">
        {{ label }}
      </p>
      <span
        v-if="slots.icon"
        data-testid="icon-container"
        :class="`styled-link--icon-container ${iconContainerClasses}`"
      >
        <slot name="icon" />
      </span>
    </template>
  </component>
</template>

<script setup lang="ts">
  import { useSlots } from 'vue';

  const props = defineProps({
    label: {
      type: String,
      default: '',
    },
    labelClasses: {
      type: String,
      default: '',
    },
    iconContainerClasses: {
      type: String,
      default: '',
    },
    isAnchor: {
      type: Boolean,
      default: false,
    },
    linkTo: {
      type: String,
      default: '',
    },
    params: {
      type: Object,
      default: () => {},
    },
  });

  const component = props.isAnchor ? 'a' : 'router-link';

  const emit = defineEmits(['click']);

  const slots = useSlots();
</script>
