import React from 'react';
import Provider from './context/Provider';
import PlanetList from './pages/PlanetList';

function App() {
  return (
    <Provider>
      <PlanetList />
    </Provider>
  );
}

export default App;
