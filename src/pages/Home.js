import React, { useEffect, useState } from 'react';
import Table from '../components/PlanetTable';
// import PlanetContext from '../context/context';
import fetchPlanets from '../services/planetAPI';

export default function Home() {
  const [planetList, setPlanetList] = useState(null);
  useEffect(() => {
    const setPlanets = async () => {
      setPlanetList(await fetchPlanets());
    };
    setPlanets();
  }, []);
  return (planetList && <Table list={ planetList.results } />);
}
