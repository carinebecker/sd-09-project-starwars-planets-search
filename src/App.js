import React from 'react';
import { Provider } from './context/StarWarsContext';
import Table from './component/Table';
import './App.css';

function App() {
  return (
    <main>
      <Provider>
        <Table />
      </Provider>
    </main>
  );
}
export default App;
