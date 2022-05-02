import { useAsync } from './useAsync';
import axios from 'axios';
import { ID, parseToYearAndMonth } from '../utility';
import { Item } from '../types';

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
  const { run, ...asyncResult } = useAsync();
  const mutate = (data: any, categoryId: string) => {
    const newId = ID();
    const parsedDate = parseToYearAndMonth(data.date);
    data.monthCategory = `${parsedDate.year}-${parsedDate.month}`;
    data.timestamp = new Date(data.date).getTime();
    return run(
      axios.post('/items', {
        ...data,
        id: newId,
        cid: categoryId,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useUpdateItem = () => {
  const { run, ...asyncResult } = useAsync();
  const mutate = (item: Item, categoryId: string) => {
    const modifiedItem = {
      ...item,
      cid: categoryId,
      timestamp: new Date(item.date).getTime(),
    };

    return run(axios.put(`/items/${modifiedItem.id}`, modifiedItem));
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useDeleteItem = () => {
  const { run, ...asyncResult } = useAsync();
  const mutate = (item: Item) => {
    return run(axios.delete(`/items/${item.id}`));
  };
  return {
    mutate,
    ...asyncResult,
  };
};
