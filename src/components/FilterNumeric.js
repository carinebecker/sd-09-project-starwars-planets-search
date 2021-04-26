import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function FilterNumeric() {
  // const {  } = useContext(StarwarsContext);
  return (
    <div>
      <select data-testid="column-filter">
        <option></option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
      />
    </div>
  )
}

export default FilterNumeric;
