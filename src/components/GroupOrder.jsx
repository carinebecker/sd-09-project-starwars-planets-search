import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function InputOrder() {
  const { tableHeader } = useContext(PlanetsContext);

  const renderOptions = () => (
    tableHeader.map((column) => <option key={ column }>{ column }</option>)
  );

  return (
    <div>
      <select data-testid="column-sort">
        {renderOptions()}
      </select>
      <label htmlFor="column-sort-input-asc">
        ASC
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="order"
          value="ASC"
        />
      </label>
      <label htmlFor="column-sort-input-asc">
        DESC
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="order"
          value="DESC"
        />
      </label>
    </div>
  );
}

export default InputOrder;
