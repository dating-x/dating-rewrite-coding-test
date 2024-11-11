import type { OnlineUserApiDTO } from '@/Types/Responses';

export async function getOnlineProfiles(): Promise<OnlineUserApiDTO[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let output = [];
      for (let i = 0; i < 6; i++) {
        output.push({
          hash_id: "a123114ffc",
            nick_name: "sample",
          province: {
            id: 1,
            name: 'Sample province',
            is_default: false,
          },
          profile_image: {
            hash_id: '14abbca',
            url: `https://picsum.photos/200/300?random=${i + 1}`,
            thumb_url: `https://picsum.photos/200/300?random=${i + 1}`,
          },
          age: 24,
        })
      }

      resolve(output);
    }, 300);
  });
}
