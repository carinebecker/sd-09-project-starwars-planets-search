import React from 'react';
import SearchBar from '../components/SearchBar';
import FilterSearch from '../components/FilterSearch';
import OrderTable from '../components/OrderTable';
import Table from '../components/Table';

function Home() {
  return (
    <>
      <SearchBar />
      <FilterSearch />
      <OrderTable />
      <Table />
    </>
  );
}

export default Home;
