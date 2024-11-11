import type { Metas } from '@/Types/Augmentations';
import type { FooterLink } from '@/Types/Components';

type AllOrNone<T> = T | { [K in keyof T]?: never };

export interface SelectOption {
  label: string;
  value: string | number | null;
}

export interface AppConfigContent {
  mid_section_title: string;
  mid_section_slogan: string;
  mid_section_button: string;
  content_left_title: string;
  content_left_text: string;
  content_left_button: string;
  content_right_title: string;
  content_right_text: string;
  content_right_button: string;
  registration_box_title: string;
  registration_box_slogan: string;
  registration_box_button: string;
  footer_links: string | (string & FooterLink[]);
  footer_text: string;
}

export interface AppConfig {
  assetUrl: string;
  locale: string;
  canonicalUrl: string;
  clean: boolean;
  domainName: string;
  footerAddress: string;
  referer: string;
  recaptchaKey: string;
  homeColor: string;
  content: AppConfigContent;
  homeMetas: Metas;
  otherMetas: {
    login: Metas;
    faq: Metas;
    support: Metas;
  };
  profileConfirmation: string;
  captchaKey: string;
  affiliateLink: string;
  vapidPublicKey: string;
  webcamUrl: string;
}
