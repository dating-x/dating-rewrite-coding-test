<template>
  <div
    :data-testid="`${dataTestid}-wrapper`"
    class="flex w-auto"
    :class="{
      'flex-col': labelPosition === POSITION.top,
      'flex-row items-center': labelPosition === POSITION.left,
      'flex-col-reverse': labelPosition === POSITION.bottom,
      'flex-row-reverse items-center': labelPosition === POSITION.right,
    }"
  >
    <label
      v-if="label"
      :data-testid="`${dataTestid}-label`"
      :for="labelFor"
      class="min-w-fit"
      :class="{
        'text-left 2xsm:mb-1.5 lg:mb-2.5': labelPosition === POSITION.top,
        'pe-2.5 text-right': labelPosition === POSITION.left,
        'text-left': labelPosition === POSITION.bottom,
        'ps-2.5': labelPosition === POSITION.right,
        [LABEL_VARIANT[variant]]: !!variant,
        [customLabelClass]: !!customLabelClass,
      }"
    >
      {{ $t(label) }}
    </label>

    <div class="relative w-full" :class="customWrapperClass">
      <div class="select-wrapper w-full">
        <select
          :ref="selectEle"
          :value="value"
          :name="name"
          :data-testid="dataTestid"
          class="block w-full cursor-pointer appearance-none rounded border border-gray-300 bg-white p-3 pr-8 font-medium leading-tight text-neutral-800 focus:border-gray-300 focus:bg-white focus:outline-none"
          :class="customSelectClass"
          :disabled="disabled"
          :required="required"
          @change="handleSelectChange"
        >
          <option v-if="firstEmptyOption" data-testid="select-option" value="" :disabled="!firstEmptyOptionAllowed">
            {{ firstEmptyOption }}
          </option>

          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            :data-value="JSON.stringify(option.value)"
            data-testid="select-option"
            role="option"
          >
            {{ $t(option.label) }}
          </option>
        </select>
      </div>

      <p
        v-if="error"
        :data-testid="`${dataTestid}-error`"
        :class="{ 'mt-1 text-left text-xs text-red-500': true, 'ms-18': labelPosition === POSITION.left }"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, ref } from 'vue';
  import type { SelectOption } from '@/Types/General';

  export const POSITION: Record<string, string> = {
    top: 'top',
    left: 'left',
    bottom: 'bottom',
    right: 'right',
  };

  export const LABEL_VARIANT: Record<string, string> = {
    default: 'default font-medium',
    default_mobile: 'font-sans 2xsm:font-medium lg:font-medium 2xsm:text-xl 2xsm:text-white lg:text-neutral-800',
  };
</script>
<script setup lang="ts">
  const emit = defineEmits(['update:modelValue']);

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: '',
    },

    options: {
      type: Array as () => SelectOption[],
      default: () => [],
    },

    label: {
      type: String,
      default: '',
    },

    labelPosition: {
      type: String,
      default: POSITION.left,
      validator: (value: string) => Object.keys(POSITION).includes(value),
    },

    labelFor: {
      type: String,
      default: null,
    },

    error: {
      type: String,
      default: '',
    },

    firstEmptyOption: {
      type: String,
      default: null,
    },

    firstEmptyOptionAllowed: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: 'text',
    },

    variant: {
      type: String,
      default: LABEL_VARIANT.default,
    },

    customLabelClass: {
      type: String,
      default: null,
    },

    customWrapperClass: {
      type: String,
      default: null,
    },

    dataTestid: {
      type: String,
      default: null,
    },

    customSelectClass: {
      type: String,
      default: null,
    },

    dataObject: {
      type: Boolean,
      default: false,
      description: 'If true, the select value will be stored as a object',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    required: {
      type: Boolean,
      default: false,
    },
  });

  const selectEle = ref();

  const value = computed(() => props.modelValue);

  const handleSelectChange = (event: any) => {
    const value =
      props.options[props.firstEmptyOption !== null ? event.target.selectedIndex - 1 : event.target.selectedIndex]
        ?.value;

    if (props.dataObject) {
      emit('update:modelValue', value !== null && value !== undefined ? value.toString() : value);
    } else {
      emit('update:modelValue', value);
    }
  };
</script>

<style lang="scss" scoped>
  .select-wrapper {
    @apply relative after:absolute after:content-['\f107'] after:right-[10px] after:top-[50%] text-[#dcdcdc];
  }
  .select-wrapper::after {
    @apply -translate-x-2/4 -translate-y-2/4 right-2 top-2/4;
    font: 22px/1 FontAwesome;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
</style>
