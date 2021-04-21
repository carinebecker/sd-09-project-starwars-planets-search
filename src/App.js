import React from 'react';
import './App.css';
import SearchInput from './Common/Components/SearchInput';
import SWProvider from './Common/Services/SWProvider';
import StarWarsDatabase from './Pages/StarWarsDatabase';

function App() {
  return (
    <SWProvider>
      <StarWarsDatabase />
      <SearchInput />
    </SWProvider>
  );
}

export default App;
