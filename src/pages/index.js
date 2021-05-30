import React from 'react';
import Filters from '../components/Filters';
import OrderForm from '../components/OrderForm';
import Form from '../components/Store';
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
