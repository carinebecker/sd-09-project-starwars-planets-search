import React from 'react';
import Filters from '../components/Filters';
import NumericFilter from '../components/NumericFilter';
import Orderer from '../components/Orderer';
import Table from '../components/Table';
import TextFilter from '../components/TextFilter';

export default function MainPage() {
  return (
    <div>
      <TextFilter />
      <NumericFilter />
      <Filters />
      <Orderer />
      <Table />
    </div>
  );
}
