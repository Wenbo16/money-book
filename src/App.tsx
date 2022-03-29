import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Item, Category } from "./types";
import Home from "./pages/Home";
import Create from "./pages/Create";
import { flattenArr, removeKey, ID, parseToYearAndMonth } from "./utility";
import { AppContext } from "./context";
import Nav from "./pages/Nav";
import Stats from "./pages/Stats";
import Map from "./pages/Map";
import "./App.css";

function App() {
  const [items, setItems] = useState({});
  const [categories, setCategories] = useState<Category[] | {}>({});
  const [currentDate, setCurrentDate] = useState(parseToYearAndMonth());
  const [isLoading, setIsLoading] = useState(false);

  const actions = {
    getInitialData: async () => {
      setIsLoading(true);
      const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
      const results = await Promise.all([
        axios.get("/categories"),
        axios.get(getURLWithData),
      ]);
      const [categories, items] = results;
      setCategories(flattenArr(categories.data));
      setItems(flattenArr(items.data));
      setIsLoading(false);
    },

    selectNewMonth: async (year: number, month: number) => {
      setIsLoading(true);
      const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
      const items = await axios.get(getURLWithData);
      setItems(flattenArr(items.data));
      setCurrentDate({ year, month });
      setIsLoading(false);
      return items;
    },

    deleteItem: async (item: Item) => {
      setIsLoading(true);
      const deleteItem = await axios.delete(`/items/${item.id}`);
      let newItems = removeKey(items, item.id);
      setItems(newItems);
      setIsLoading(false);
      return deleteItem;
    },

    createItem: async (data: any, categoryId: string) => {
      setIsLoading(true);
      const newId = ID();
      const parsedDate = parseToYearAndMonth(data.date);
      data.monthCategory = `${parsedDate.year}-${parsedDate.month}`;
      data.timestamp = new Date(data.date).getTime();

      const newItem = await axios.post("/items", {
        ...data,
        id: newId,
        cid: categoryId,
      });
      setItems({ ...items, [newId]: newItem.data });
      setIsLoading(false);
      return newItem.data;
    },

    updateItem: async (item: Item, categoryId: string) => {
      setIsLoading(true);
      const modifiedItem = {
        ...item,
        cid: categoryId,
        timestamp: new Date(item.date).getTime(),
      };
      setItems({ ...items, [modifiedItem.id]: modifiedItem });

      const updatedItem = await axios.put(
        `/items/${modifiedItem.id}`,
        modifiedItem
      );
      setItems({ ...items, [modifiedItem.id]: modifiedItem });
      setIsLoading(false);
      return updatedItem.data;
    },
  };

  useEffect(() => {
    actions.getInitialData();
  }, []);

  return (
    <AppContext.Provider
      value={{ items, categories, currentDate, actions, isLoading }}
    >
      <Router>
        <div className="App">
          <div className="container pb-5">
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/edit/:id">
                <Create />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
              <Route path="/map">
                <Map />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
            <Nav />
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
