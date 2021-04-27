import React, { useState, useContext } from 'react';

import StarWars from '../context/StarWarsContext';
import './css/Filter.css';

const FilterByColumn = () => {
  const { setFilterColumn } = useContext(StarWars);
  const [column, setColumn] = useState('');
  const [options, setOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const removeOptions = (value) => options.filter((option) => option !== value);

  const handleChanges = ({ target }) => {
    setColumn(target.value);
    setFilterColumn(target.value);
    setOptions(removeOptions(target.value));
  };

  return (
    <div>
      <select
        className="dropdown"
        data-testid="column-filter"
        name="column-filter"
        value={ column }
        onChange={ handleChanges }
      >
        { options.map((option) => (
          <option data-testid={ option } key={ option }>{option}</option>)) }
      </select>
    </div>
  );
};

export default FilterByColumn;
