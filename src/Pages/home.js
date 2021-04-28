import React from 'react';
import TablePlanet from '../components/tablePlanets';
import FilterName from '../components/filterName';
import FilterNumberValue from '../components/filterNumberValue';
import '../styles/home.css';

const HomePage = () => (
  <main>
    <h1 className="title">
      Star Wars Planet Search
    </h1>
    <FilterName />
    <FilterNumberValue />
    <TablePlanet />
  </main>
);

export default HomePage;
