import React, { useEffect, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import Table from '../components/PlanetTable';
import Filter from '../components/Filter';
import PlanetContext from '../context/context';
import fetchPlanets from '../services/planetAPI';

export default function Home() {
  const { planetList, setPlanetList, filters } = useContext(PlanetContext);
  useEffect(() => {
    const setPlanets = async () => {
      const planets = await fetchPlanets();
      setPlanetList(planets.results);
    };
    setPlanets();
  }, [setPlanetList]);
  const { name } = filters.filterByName;
  return (
    <div>
      <Nav>
        <Filter />
      </Nav>
      {planetList && <Table
        list={ planetList.filter((each) => each.name.includes(name)) }
      />}
    </div>);
}
