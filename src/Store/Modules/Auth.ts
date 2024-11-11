import { getProvinces } from '@/Client/Geolocation';
import { defineStore } from 'pinia';

import type { ProvinceApiDTO } from '@/Types/Responses';

interface State {
  provinces: ProvinceApiDTO[];
}

const state = (): State => ({
  provinces: [],
});

const getters = {
  defaultProvince: (state: State) => state.provinces.find((province) => province.is_default),
  provincesOptions: (state: State) =>
    state.provinces.map((province: ProvinceApiDTO) => ({
      label: province.name,
      value: province.id,
    })),
};

const mutations = {};

const actions = {
  async fetchProvinces(): Promise<ProvinceApiDTO[]> {
    const response = await getProvinces();
    this.provinces = response;
    return response;
  },
};

export const useAuthStore = defineStore('auth', {
  state,
  getters,
  actions: { ...mutations, ...actions },
});
