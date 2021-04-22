import React, { useContext } from 'react';
import planetsContext from '../Context/planetsContext';

function NameFilter() {
  const { filterByName, setFilterByName } = useContext(planetsContext);
  return (
    <div>
      <label htmlFor="name-filter">
        {'Planet: '}
        <input
          type="text"
          value={ filterByName }
          onChange={ (e) => setFilterByName(e.target.value) }
          id="name-filter"
          data-testid="name-filter"
        />
      </label>
    </div>
  );
}

export default NameFilter;
