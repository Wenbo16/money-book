import { useAsync } from '../hooks/useAsync';
import axios from 'axios';
import { ID, parseToYearAndMonth } from '../utils/utility';
import { Item } from '../types';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { flattenArr } from '../utils/utility';

export const useCategories = () => {
  return useQuery('categories', async () => {
    const data = await axios.get('/categories');
    return flattenArr(data.data);
  });
};

export const useItems = (params?: Partial<Item>) => {
  return useQuery(['items', params], async () => {
    const data = await axios.get('/items', { params });
    return flattenArr(data.data);
  });
};

export const useItem = (id?: string) => {
  return useQuery(
    ['items', id],
    async () => {
      const data = await axios.get(`/items/${id}`);
      return data.data;
    },
    {
      // The query will not execute until the id exists
      enabled: !!id,
    }
  );
};

export const useGetMonthItems = () => {
  const { run, ...asyncResult } = useAsync();
  const mutate = (year: number, month: number) => {
    const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
    return run(axios.get(getURLWithData));
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { data: Partial<Item>; categoryId: string }) => {
      const { data, categoryId } = params;
      const newId = ID();
      const parsedDate = parseToYearAndMonth(data.date);
      data.monthCategory = `${parsedDate.year}-${parsedDate.month}`;
      data.timestamp = new Date(data.date!).getTime();
      return axios.post('/items', {
        ...data,
        id: newId,
        cid: categoryId,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('items'),
    }
  );
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { data: Partial<Item>; categoryId: string }) => {
      const { data, categoryId } = params;
      const modifiedItem = {
        ...data,
        cid: categoryId,
        timestamp: new Date(data.date!).getTime(),
      };
      return axios.put(`/items/${modifiedItem.id}`, modifiedItem);
    },
    {
      onSuccess: () => queryClient.invalidateQueries('items'),
    }
  );
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => axios.delete(`/items/${id}`), {
    onSuccess: () => queryClient.invalidateQueries('items'),
  });
};
