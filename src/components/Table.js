import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import SWContext from '../StarWarsContext';

import TableHeader from './TableHeader';
import TableData from './TableData';

function Table() {
  const context = useContext(SWContext);
  const { planetsToFilter } = context;

  return (
    <table>
      <TableHeader />
      <TableData planetsToFilter={ planetsToFilter } />
    </table>
  );
}

export default Table;
