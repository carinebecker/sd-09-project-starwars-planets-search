import React from 'react';
import NameFilter from '../NameFilter';
import NumericFilter from '../NumericFilter';

export default function FilterForm() {
  return (
    <form>
      <NameFilter />
      <NumericFilter />
    </form>
  );
}
