import React, { useEffect } from 'react';
import logo from '../logo.svg';
import Loader from '../components/Loader/Loader';
import ActivityList from '../components/Activity-List/ActivityList';
import Summary from '../components/Summary/Summary';
import MonthPicker from '../components/Month-Picker/MonthPicker';
import styled from '@emotion/styled';
import { TYPE_OUTCOME } from '../utils/utility';
import { useCategories, useItems, useGetMonthItems } from '../services/items';
import {
  useUrlQueryParam,
  useSetUrlSearchParam,
} from '../hooks/useUrlQueryParam';
import { parseToYearAndMonth } from '../utils/utility';
import { useItemsQueryKey } from './utils';
// 数据流
function Home() {
  const currentDate = parseToYearAndMonth();
  const setSearchParams = useSetUrlSearchParam();
  const { data: categories = {} } = useCategories();
  const [searchParams] = useUrlQueryParam(['year', 'month']);

  useEffect(() => {
    if (!searchParams.year || !searchParams.month) setSearchParams(currentDate);
  }, [searchParams, currentDate, setSearchParams]);

  const { data: items = {} } = useItems(useItemsQueryKey());
  const { mutate: mutateGetMonthItems } = useGetMonthItems();

  const changeDate = (year, month) => {
    mutateGetMonthItems(year, month).then(() => {
      setSearchParams({ year: year, month: month });
    });
  };

  const itemsWithCategory = Object.keys(items).map((id) => {
    items[id].category = categories[items[id].cid];
    return items[id];
  });
  // .filter(item => {
  // 	return item.date.includes(`${currentDate.year}-${makeMonthDoubleDigit(currentDate.month)}`)
  // })

  let totalIncome = 0;
  let totalOutcome = 0;
  itemsWithCategory.forEach((item) => {
    if (item.category.type === TYPE_OUTCOME) {
      totalOutcome += item.amount;
    } else {
      totalIncome += item.amount;
    }
  });

  return (
    <div className="Home">
      <Header className="App-header">
        <div className="row mb-5">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="row">
          <div className="col">
            <MonthPicker
              year={Number(searchParams.year)}
              month={Number(searchParams.month)}
              onChange={changeDate}
            />
          </div>
          <div className="col">
            <Summary income={totalIncome} outcome={totalOutcome} />
          </div>
        </div>
      </Header>
      <div className="content-area py-3 px-3">
        <ActivityList items={itemsWithCategory} />
      </div>
    </div>
  );
}

const Header = styled.header`
  background-color: #a3c7be;
  padding: 20px;
  color: white;
`;

export default Home;
