import React, { useEffect } from 'react';
import Table from '../components/Table';
import { usePlanets } from '../context/Planets';
import fetchPlanets from '../services';

const Planets = () => {
  const { setData } = usePlanets();
  useEffect(() => {
    fetchPlanets().then((planets) => setData(planets));
  }, [setData]);
  return (
    <div className="planets-container">
      <Table />
    </div>
  );
};

export default Planets;
