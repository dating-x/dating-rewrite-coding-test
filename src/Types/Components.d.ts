import type { OnlineUserApiDTO } from '@/Types/Responses';

export type Profile = OnlineUserApiDTO;

export interface MenuItem {
  name: string;
  route?: string;
  iconClasses?: string;
  rightContent?: string;
  isExternal?: boolean;
  emitter?: string;
  externalRoute?: string;
  params?: object;
}

export interface FooterLink {
  name: string;
  title: string;
  url: string;
}
