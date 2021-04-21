import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Filter.css';

const Filter = () => {
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

export default Filter;
