import { useMemo } from 'react';
import { useUrlQueryParam } from '../hooks/useUrlQueryParam';

export const useItemsSearchParams = () => {
  const [searchParams] = useUrlQueryParam(['year', 'month']);
  return searchParams;
};

export const useItemsQueryKey = () => {
  const searchParams = useItemsSearchParams();
  return useMemo(
    () => ({
      monthCategory: `${searchParams.year}-${searchParams.month}`,
      _sort: 'timestamp',
      _order: 'desc',
    }),
    [searchParams.year, searchParams.month]
  );
};
