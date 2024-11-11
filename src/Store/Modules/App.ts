import i18n from '@/Services/I18n';
import { useBreakpoints } from '@vueuse/core';
import { defineStore } from 'pinia';

import { type Ref } from 'vue';

import type { AppConfig, AppConfigContent } from '@/Types/General';

interface IBreakpoints {
  greater: (k: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => Ref<boolean>;
  greaterOrEqual: (k: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => Ref<boolean>;
  smaller: (k: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => Ref<boolean>;
  smallerOrEqual: (k: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => Ref<boolean>;
  between: (a: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg', b: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => Ref<boolean>;
  isGreater: (k: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => boolean;
  isGreaterOrEqual: (k: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => boolean;
  isSmaller: (k: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => boolean;
  isSmallerOrEqual: (k: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => boolean;
  isInBetween: (a: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg', b: 'sm' | 'md' | 'lg' | 'retina' | 'xxlg') => boolean;
}

interface State {
  breakpoints: IBreakpoints;
  windowSize: {
    width?: number;
    height?: number;
  } | null;
  appConfig: AppConfig;
  routeFrom: string | null;
}

const BREAKPOINTS_DEFAULT = {
  sm: 414,
  md: 767,
  lg: 1199,
  xxlg: 1440,
  retina: 1441,
};

const defaultContentText: AppConfigContent = {
  mid_section_title: i18n.global.t('Find your flirt'),
  mid_section_slogan: i18n.global.t(
    'If you just want to flirt, make friends or even find that special one, this is the place for you!',
  ),
  mid_section_button: i18n.global.t('Join now'),
  content_left_title: i18n.global.t('You decide what to look for'),
  content_left_text: i18n.global.t(
    'Chatting, meeting or making friends? Let yourself go, choose who you want and start talking. More than half of our users have a date during the first week. Good luck!',
  ),
  content_left_button: i18n.global.t('Join now'),
  content_right_title: i18n.global.t('Connect with people like you'),
  content_right_text: i18n.global.t(
    'Connect with people in your city. Stop thinking about it! Join the social phenomenon of the moment. Every day thousands of people like you come together looking for all kinds of relationships.',
  ),
  content_right_button: i18n.global.t('Join now'),
  registration_box_title: i18n.global.t('Join Us'),
  registration_box_slogan: i18n.global.t('Find people near you'),
  registration_box_button: i18n.global.t('Join Free'),
  footer_links: '',
  footer_text: '',
};

const state = (): State => ({
  windowSize: null,
  breakpoints: useBreakpoints(BREAKPOINTS_DEFAULT),
  appConfig: window.appConfig,
  routeFrom: null,
});

const getters = {
  isSmallestMobile: (state: State) => state.breakpoints.isSmaller('sm'),
  isSmallMobile: (state: State) =>
    state.breakpoints !== null
      ? state.breakpoints.isSmallerOrEqual('sm') || state.breakpoints.isInBetween('sm', 'md')
      : null,
  isTabletMobile: (state: State) => state.breakpoints.isInBetween('md', 'lg'),
  isDesktop: (state: State) => state.breakpoints.isInBetween('lg', 'retina') || state.breakpoints.isGreater('lg'),
  largeScreen: (state: State) => state.breakpoints.isGreater('retina'),
  appContent: (state: State): AppConfigContent => {
    const content: AppConfigContent = state.appConfig.content;
    const mappedObject: AppConfigContent = { ...content };

    for (const key in content) {
      if (mappedObject[key as keyof AppConfigContent] === '') {
        mappedObject[key as keyof AppConfigContent] = defaultContentText[key as keyof AppConfigContent];
      }
    }
    return mappedObject;
  },
};

const mutations = {
  refreshBreakpoints(): void {
    this.breakpoints = useBreakpoints(BREAKPOINTS_DEFAULT);
  },

  setWindowSize(width: number, height: number): void {
    this.windowSize = {
      width,
      height,
    };

    this.breakpoints = useBreakpoints(BREAKPOINTS_DEFAULT);
  },

  setAppConfig(appConfig: AppConfig) {
    this.appConfig = appConfig;
  },

  setRouteFrom(route: string) {
    this.routeFrom = route;
  },
};

const actions = {};

export const useAppStore = defineStore('app', {
  state,
  getters,
  actions: { ...actions, ...mutations },
});
