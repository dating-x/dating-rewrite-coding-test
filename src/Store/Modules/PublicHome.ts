import { getOnlineProfiles } from '@/Client/Public';
import { defineStore } from 'pinia';
import type { OnlineUserApiDTO } from '@/Types/Responses';

interface State {
  onlineProfiles: OnlineUserApiDTO[];
}

const state = (): State => ({
  onlineProfiles: [],
});

const getters = {};

const mutations = {};

const actions = {
  async fetchOnlineProfiles(): Promise<void> {
    this.onlineProfiles = await getOnlineProfiles();
  },
};
export const usePublicHomeStore = defineStore('publicHome', {
  state,
  getters,
  actions: { ...actions, ...mutations },
});
