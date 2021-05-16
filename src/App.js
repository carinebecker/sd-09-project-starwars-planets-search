import './styles/App.css';
import React from 'react';
import Provider from './context/Provider';
import Header from './components/Header';
import Filters from './components/Filters';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Header />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
