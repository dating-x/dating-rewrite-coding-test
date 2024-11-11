export interface OnlineUserApiDTO {
  hash_id: string;
  nick_name: string;
  age: number;
  province: {
    id: number;
    name: string;
    is_default: boolean;
  };
  profile_image: ImageApiDTO;
}

export interface ImageApiDTO {
  hash_id: string;
  url: string;
  thumb_url: string;
}

export interface ProvinceApiDTO {
  id: number;
  name: string;
  is_default: boolean;
}
