import React from 'react';
import './App.css';
import Provider from './context/PlanetsProvider';
import PlanetsTable from './components/PlanetsTable';
import GroupFilter from './components/GroupFilter';
import GroupOrder from './components/GroupOrder';

function App() {
  return (
    <Provider>
      <GroupFilter />
      <GroupOrder />
      <PlanetsTable />
    </Provider>
  );
}

export default App;
