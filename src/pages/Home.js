import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context";
import logo from "../logo.svg";
import Loader from "../components/Loader/Loader";
import ActivityList from "../components/Activity-List/ActivityList";
import Summary from "../components/Summary/Summary";
import MonthPicker from "../components/Month-Picker/MonthPicker";
import styled from "@emotion/styled";
import { TYPE_OUTCOME, removeKey, flattenArr } from "../utility";
import { useDeleteItem, useGetMonthItems } from "../hooks/useItems";

// 数据流
function Home() {
  const {
    items,
    categories,
    currentDate,
    setCurrentDate,
    setItems,
    isLoading,
  } = useContext(AppContext);
  let history = useHistory();
  const { mutate: mutateDeleteItem } = useDeleteItem();
  const { mutate: mutateGetMonthItems } = useGetMonthItems();

  const changeDate = (year, month) => {
    mutateGetMonthItems(year, month).then((items) => {
      setItems(flattenArr(items.data));
      setCurrentDate({ year, month });
    });
  };

  const modifyItem = (modifiedItem) => {
    history.push(`/edit/${modifiedItem.id}`);
  };

  const deleteItem = (item) => {
    mutateDeleteItem(item).then((deletedItem) => {
      let newItems = removeKey(items, item.id);
      setItems(newItems);
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
              year={currentDate.year}
              month={currentDate.month}
              onChange={changeDate}
            />
          </div>
          <div className="col">
            <Summary income={totalIncome} outcome={totalOutcome} />
          </div>
        </div>
      </Header>
      <div className="content-area py-3 px-3">
        <ActivityList
          items={itemsWithCategory}
          onModifyItem={modifyItem}
          onDeleteItem={deleteItem}
        />
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
