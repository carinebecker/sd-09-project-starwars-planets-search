import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './FilterByName.css';

const FilterByName = () => {
  const { filterChangeHandler } = useContext(PlanetsContext);

  return (
    <section>
      <input
        className="search"
        data-testid="name-filter"
        type="text"
        placeholder="Pass on what you have SEARCHED"
        onChange={ (event) => filterChangeHandler(event) }
      />
    </section>
  );
};

export default FilterByName;
