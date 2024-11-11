import type { ProvinceApiDTO } from '@/Types/Responses';

export async function getProvinces(): Promise<ProvinceApiDTO[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          "id": 85,
          "name": "Alabama",
          "is_default": true
        },
        {
          "id": 86,
          "name": "Alaska",
          "is_default": false
        },
        {
          "id": 87,
          "name": "Arizona",
          "is_default": false
        },
      ]);
    }, 300);
  });
}
