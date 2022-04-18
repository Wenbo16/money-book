import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Category } from "./types";
import Home from "./pages/Home";
import Create from "./pages/Create";
import { flattenArr, parseToYearAndMonth } from "./utility";
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

  const getInitialData = async () => {
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
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        items,
        setItems,
        categories,
        currentDate,
        setCurrentDate,
        isLoading,
      }}
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
