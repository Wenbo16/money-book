import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home';
import Create from './pages/Create';
import Nav from './pages/Nav';
import Stats from './pages/Stats';
import TestUseCallback from './pages/TestUseCallback';
import TestUseRef from './pages/TestUseRef';

import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <div className="container pb-5">
            {/* A <Routes> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Routes>
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Create />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/testUseCallback" element={<TestUseCallback />} />
              <Route path="/testUseRef" element={<TestUseRef />} />
              <Route index element={<Home />} />
            </Routes>
            <Nav />
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
