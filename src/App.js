import React from 'react';
import './App.css';
import Table from './Components/Table';
import { Provider } from './context';
// import requestPlanetsApi from './services/planetsAPI';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
