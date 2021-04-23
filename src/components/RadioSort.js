import React, { useContext, useState } from 'react';
import myContext from '../context/contextAPI';

function RadioSort() {
  const [sortInputs, setSortInputs] = useState({ column: 'name', sort: 'ASC' });
  const { setOrder, data } = useContext(myContext);
  return (
    <fieldset className="fieldset-sort">
      <legend>Sort</legend>
      <select
        value={ sortInputs.name }
        data-testid="column-sort"
        className="select-column-sort"
        onChange={ (evt) => setSortInputs({ ...sortInputs, column: evt.target.value }) }
      >
        {
          Object.keys(data[0])
            .map((column) => <option key={ column }>{ column }</option>)
        }
      </select>
      <div className="container-radio">
        <label htmlFor="inputRadioAsc">
          <input
            data-testid="column-sort-input-asc"
            id="inputRadioAsc"
            type="radio"
            name="sort"
            value="ASC"
            onClick={ (evt) => setSortInputs({ ...sortInputs, sort: evt.target.value }) }
          />
          Upward
        </label>
        <label htmlFor="inputRadioDesc">
          <input
            data-testid="column-sort-input-desc"
            id="inputRadioDesc"
            type="radio"
            name="sort"
            value="DESC"
            onClick={ (evt) => setSortInputs({ ...sortInputs, sort: evt.target.value }) }
          />
          Downward
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        className="btn-sort"
        type="button"
        onClick={ () => setOrder(sortInputs) }
      >
        Sort
      </button>
    </fieldset>
  );
}

export default RadioSort;
