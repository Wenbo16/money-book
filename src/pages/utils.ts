import { useUrlQueryParam } from '../hooks/useUrlQueryParam';

export const useItemsSearchParams = () => {
  const [searchParams] = useUrlQueryParam(['year', 'month']);
  return {
    monthCategory: `${searchParams.year}-${searchParams.month}`,
    _sort: 'timestamp',
    _order: 'desc',
  };
};

export const useItemsQueryKey = () => useItemsSearchParams();
