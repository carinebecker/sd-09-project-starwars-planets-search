import React from 'react';
import TablePlanet from '../components/tablePlanets';

import '../styles/home.css';

const HomePage = () => (
  <main>
    <h1 className="title">
      Star Wars Planet Search
    </h1>
    <TablePlanet />
  </main>
);

export default HomePage;
