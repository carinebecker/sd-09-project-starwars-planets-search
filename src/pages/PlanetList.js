import React from 'react';
import FilterInput from '../components/FilterInput';
import Table from '../components/Table';
import FilterNumeric from '../components/FilterNumeric';
import FilterOrder from '../components/FilterOrder';

function PlanetList() {
  return (
    <>
      <FilterOrder />
      <FilterInput />
      <FilterNumeric />
      <Table />
    </>
  );
}

export default PlanetList;
