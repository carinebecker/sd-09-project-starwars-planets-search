import React from 'react';
import AppProvider from './appContext/Provider';
import Header from './components/Header';
import Table from './components/Table';

function App() {
  return (
    <div>
      <AppProvider>
        <Header />
      </AppProvider>
    </div>
  );
}

export default App;
