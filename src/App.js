import React, { useContext } from 'react';
import './App.css';
import PlanetResume from './Components/PlanetResume';
import { Context } from './context';
// import requestPlanetsApi from './services/planetsAPI';

function App() {
  const { data } = useContext(Context);

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Rotation period</th>
        <th>Orbital period</th>
        <th>diameter</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Terrain</th>
        <th>Surface_water</th>
        <th>Population</th>
        <th>Films</th>
        <th>Created</th>
        <th>Edited</th>
        <th>URL</th>
      </tr>
      { data.map((planet) => <PlanetResume planet={ planet } key={ planet.name } />) }
    </table>
  );
}

export default App;
