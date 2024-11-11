<template>
  <button
    v-bind="$attrs"
    data-testid="styled-button"
    :class="{
      'styled-button relative flex items-center justify-center font-medium': true,
      [WIDTH[width]]: !!width,
      [SIZE[size]]: !!size,
      [ICON_POSITION[iconPosition]]: !!iconClass && !!iconPosition,
      [VARIANT_CLASSES[variant]]: !!variant,
      [BG_COLORS[color]]: variant === 'contained',
      [TEXT_COLORS[color]]: variant !== 'contained',
      [BORDER_COLORS[color]]: variant === 'outlined',
      [SHADOW_COLORS[color]]: shadow,
      [GRADIENT_COLOR[color]]: gradient,
      'hover:text-white': variant === 'outlined',
      'block rounded': rounded,
      'contrast-75': loading,
    }"
    :disabled="loading || disabled"
  >
    <slot v-if="!!slots['icon']" name="icon" />
    <i v-else data-testid="styled-button-icon" :class="iconClass" />

    <i v-if="loading" data-testid="loader-icon" :class="{ 'fa fa-spinner fa-pulse absolute inset-x-0 m-auto': true }" />

    <p
      :class="{
        ['text-inherit']: true,
        ['invisible']: loading,
        ['visible']: !loading,
        [textClasses]: !!textClasses,
      }"
    >
      {{ text }}
    </p>
  </button>
</template>

<script setup lang="ts">
  import { useSlots } from 'vue';

  defineProps({
    text: {
      type: String,
      default: '',
    },

    loading: {
      type: Boolean,
      default: false,
    },

    variant: {
      type: String,
      default: 'contained',
    },

    iconPosition: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value),
    },

    iconClass: {
      type: String,
      default: null,
    },

    iconSize: {
      type: String,
      default: 'md',
    },

    width: {
      type: String,
      default: 'full',
    },

    size: {
      type: String,
      default: 'md',
    },

    textClasses: {
      type: String,
      default: null,
    },

    rounded: {
      type: Boolean,
      default: false,
    },

    shadow: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: 'default',
    },

    gradient: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const slots = useSlots();
</script>

<script lang="ts">
  export const SIZE: Record<string, string> = {
    xxs: 'py-[4px] px-[6px] text-[14px]',
    xs: 'py-[8px] px-[10px] text-[14px]',
    sm: 'py-[10px] px-[15px] text-sm',
    md: 'pt-[12px] px-[15px] pb-[11px]',
    lg: 'py-[14px] px-[24px] text-xmd',
    xlg: 'py-[15px] px-[40px] text-xl',
  };

  export const TEXT_COLORS: Record<string, string> = {
    default: 'text-[#D93C61] hover:text-inherit',
    primary: 'text-primary decoration-primary hover:text-ff4b77',
    secondary: 'text-secondary',
    outlined: 'text-light',
    success: 'text-success',
    danger: 'text-danger',
    info: 'text-info',
    light: 'text-light',
    dark: 'text-dark',
    submit: 'text-submit',
    white: 'text-black',
  };

  export const BG_COLORS: Record<string, string> = {
    default: 'bg-default text-white',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] text-white',
    outlined: 'bg-light',
    success: 'bg-success border-success text-white',
    danger: 'bg-danger border-danger text-white',
    info: 'bg-info text-white',
    light: 'bg-light text-white',
    dark: 'bg-dark text-white',
    submit: 'bg-submit text-white',
    link: 'bg-transparent hover:underline underline-offset-1',
    white: 'bg-white text-black',
  };

  export const BORDER_COLORS: Record<string, string> = {
    default: 'border-default hover:bg-default',
    primary: 'border-primary hover:bg-primary',
    secondary: 'border-secondary hover:bg-secondary',
    outlined: 'border-light hover:bg-light',
    success: 'border-success hover:bg-success',
    danger: 'border-danger hover:bg-danger',
    info: 'border-info hover:bg-info',
    light: 'border-light hover:bg-light',
    dark: 'border-dark hover:bg-dark',
    submit: 'border-submit hover:bg-submit',
  };

  export const SHADOW_COLORS: Record<string, string> = {
    default: 'shadow-[0 2px 4px 0 rgba(155, 155, 155, 0.2)]',
    success: 'shadow-[0_5px_0_0_rgba(61,185,26,0.5)]',
    submit: 'shadow-[0_5px_0_0_rgba(61,185,26,0.5)]',
  };

  export const VARIANT_CLASSES: Record<string, string> = {
    link: 'bg-transparent hover:underline underline-offset-2',
    outlined: 'border',
    contained: '',
    icon: '',
  };

  export const ICON_POSITION: Record<string, string> = {
    left: 'flex flex-row',
    right: 'flex flex-row-reverse',
  };

  export const WIDTH: Record<string, string> = {
    auto: 'w-auto',
    full: 'w-full',
    fit: 'w-fit',
  };

  export const GRADIENT_COLOR: Record<string, string> = {
    submit: 'bg-gradient-to-b from-submit to-[#008407]',
    success: 'bg-gradient-to-b from-submit to-[#008407]',
    danger: 'bg-gradient-to-b from-danger to-[#B61A00]',
  };
</script>

<style lang="scss" scoped>
  .styled-button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
