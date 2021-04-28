import React from 'react';
import FilterInput from '../components/FilterInput';
import Table from '../components/Table';
import FilterNumeric from '../components/FilterNumeric';

function PlanetList() {
  return (
    <>
      <FilterInput />
      <FilterNumeric />
      <Table />
    </>
  );
}

export default PlanetList;
