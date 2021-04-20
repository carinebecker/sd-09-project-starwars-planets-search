import React from 'react';
import './App.css';
import SWProvider from './Common/Services/SWProvider';
import StarWarsDatabase from './Pages/StarWarsDatabase';

function App() {
  return (
    <SWProvider>
      <StarWarsDatabase />
    </SWProvider>
  );
}

export default App;
