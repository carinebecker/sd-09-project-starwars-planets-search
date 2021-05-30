import React from 'react';
import Form from '../components/FilterForm';
import Filters from '../components/Filters';
import OrderForm from '../components/OrderForm';
import Table from '../components/Table';

function Index() {
  return (
    <>
      <Form />
      <OrderForm />
      <Filters />
      <Table />
    </>
  );
}

export default Index;
