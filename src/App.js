import React from 'react';
import AppProvider from './appContext/Provider';
import FilterName from './components/FilterName';
import Header from './components/Header';

function App() {
  return (
    <div>
      <AppProvider>
        <Header />
        <FilterName />
      </AppProvider>
    </div>
  );
}

export default App;
