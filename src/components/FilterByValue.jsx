import React, { useState, useContext } from 'react';

import StarWars from '../context/StarWarsContext';
import './css/Filter.css';

const FilterByValue = () => {
  const { setFilterValue } = useContext(StarWars);
  const [value, setValue] = useState('');

  const handleChanges = ({ target }) => {
    setValue(target.value);
    setFilterValue(target.value);
  };

  return (
    <div>
      <input
        className="inputName"
        type="number"
        data-testid="value-filter"
        name="value-filter"
        value={ value }
        onChange={ handleChanges }
        placeholder="Valor:"
      />
    </div>
  );
};

export default FilterByValue;
