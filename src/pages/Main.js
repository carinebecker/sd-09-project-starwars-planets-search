import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Table from '../components/Table';
import FilterInput from '../components/FilterInput';

const Main = () => {
  const { data: { isFetching } } = useContext(PlanetsContext);

  return isFetching ? (
    <span>Loading...</span>
  ) : (
    <main>
      <FilterInput />
      <Table />
    </main>
  );
};

export default Main;
