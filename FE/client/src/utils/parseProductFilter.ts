import { IFilterParams } from '@/types/filterParams';

export function parseFilter(filters: IFilterParams) {
  const filteredData = Object.entries(filters).reduce(
    (acc: any, [key, value]: [string, string | string[] | undefined]) => {
      if (value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  const params = new URLSearchParams(filteredData);

  return `?${params}`;
}
