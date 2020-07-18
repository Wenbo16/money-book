import React, { useState, useContext, useEffect } from "react";
import Ionicon from 'react-ionicons'
import { useHistory } from "react-router-dom";
import { AppContext } from '../context'
import logo from '../logo.svg'
import Loader from '../components/Loader/Loader'
import ActivityList from "../components/Activity-List/ActivityList";
import { Tabs, Tab } from "../components/Tabs/Tabs"
import Summary from "../components/Summary/Summary";
import MonthPicker from "../components/Month-Picker/MonthPicker";

import {
	LIST_VIEW,
	CHART_VIEW,
	TYPE_OUTCOME,
} from "../utility";

const tabs = [
  LIST_VIEW,
  CHART_VIEW
]

// 数据流
function Home() {
  const [tabView, setTabViews] = useState(tabs[0]);
  const { items, categories, currentDate, actions, isLoading } = useContext(AppContext);
  let history = useHistory();
  
  // useEffect(() => {
  //   actions.getInitialData();
  // }, [])

	const changeView = (index) => {
		setTabViews(tabs[index])
  }

  const changeDate = (year, month) => {
    actions.selectNewMonth(year, month)
	}
	
  const createItem = () => {
    history.push("/create");
	}
	
  const modifyItem = (modifiedItem) => {
    history.push(`/edit/${modifiedItem.id}`);
	}
	
  const deleteItem = (item) => {
    actions.deleteItem(item)
	}
	
	const itemsWithCategory = Object.keys(items).map(id => {
    items[id].category = categories[items[id].cid]
    return items[id]
  })
  // .filter(item => {
	// 	return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
	// })

  let totalIncome = 0;
  let totalOutcome = 0;
  itemsWithCategory.forEach((item) => {
      console.log(item)

    if (item.category.type === TYPE_OUTCOME) {
      totalOutcome += item.amount;
    } else {
      totalIncome += item.amount;
    }
	});
	
  return (
    <div className="Home">
      <header className="App-header">
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
      </header>
      <div className="content-area py-3 px-3">
        {isLoading 
        ? <Loader /> 
        : <Tabs activeIndex={tabs.indexOf(tabView)} onTabChange={changeView}>
          <Tab>
            <Ionicon 
              className="rounded-circle mr-2" 
              fontSize="25px"
              color={'#007bff'}
              icon='ios-paper'
            />
            列表模式
          </Tab>
          <Tab>
            <Ionicon 
              className="rounded-circle mr-2" 
              fontSize="25px"
              color={'#007bff'}
              icon='ios-pie'
            />
            图表模式
          </Tab>
        </Tabs>}
        <button
          className="btn btn-primary btn-block d-flex justify-content-center align-items-center" 
          onClick={(e) => {createItem()}}
        >
          <Ionicon
            className="rounded-circle" 
            fontSize="30px"
            color='#fff'
            icon='ios-add-circle'
          />
          创建一条新的记账记录
        </button>
        
        { tabView === LIST_VIEW && <ActivityList
          items={itemsWithCategory}
          onModifyItem={modifyItem}
          onDeleteItem={deleteItem}
        />
				}
				{ tabView === CHART_VIEW &&
					<h1>This is Chart View</h1>
				}
      </div>
    </div>
  );
}

export default Home;
