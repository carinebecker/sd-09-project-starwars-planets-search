import React from 'react';
import NameFilter from '../NameFilter';
import NumericFilter from '../NumericFilter';
import SortingTool from '../SortingTool/SortingTool';

export default function FilterForm() {
  return (
    <form>
      <NameFilter />
      <NumericFilter />
      <SortingTool />
    </form>
  );
}
