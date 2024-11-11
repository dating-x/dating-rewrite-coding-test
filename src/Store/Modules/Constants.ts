import { defineStore } from 'pinia';

import type { SelectOption } from '@/Types/General';

const state = () => ({});

const getters = {
  sexSeekingOptions: (): SelectOption[] => [
    {
      label: 'Man looking for women',
      value: 'male-female',
    },
    {
      label: 'Man looking for men',
      value: 'male-male',
    },
    {
      label: 'Woman looking for men',
      value: 'female-male',
    },
    {
      label: 'Woman looking for women',
      value: 'female-female',
    },
  ],

  defaultSexSeekingValue: (): string => 'male-female',

  ageOptions: (): SelectOption[] =>
    [...Array(99 - 17).keys()].map((i) => ({
      label: `${i + 18} Years old`,
      value: i + 18,
    })),
};

const mutations = {};

const actions = {};

export const useConstantsStore = defineStore('constants', {
  state,
  getters,
  actions: { ...actions, ...mutations },
});
