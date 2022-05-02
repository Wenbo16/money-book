import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home';
import Create from './pages/Create';
import { parseToYearAndMonth } from './utility';
import { AppContext } from './context';
import Nav from './pages/Nav';
import Stats from './pages/Stats';
import TestUseCallback from './pages/TestUseCallback';
import TestUseRef from './pages/TestUseRef';

import './App.css';

function App() {
  const queryClient = new QueryClient();
  const [currentDate, setCurrentDate] = useState(parseToYearAndMonth());

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          currentDate,
          setCurrentDate,
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
                <Route path="/testUseCallback">
                  <TestUseCallback />
                </Route>
                <Route path="/testUseRef">
                  <TestUseRef />
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
    </QueryClientProvider>
  );
}

export default App;
