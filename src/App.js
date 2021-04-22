import React, { useContext } from 'react';
import Table from './Components/Table';
import planetsContext from './Context/planetsContext';
import './App.css';

function App() {
  const { loading } = useContext(planetsContext);
  return (
    <div>
      {!loading && <Table />}
    </div>
  );
}

export default App;
