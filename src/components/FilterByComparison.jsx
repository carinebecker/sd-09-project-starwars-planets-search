import React, { useContext, useState } from 'react';

import StarWars from '../context/StarWarsContext';
import './css/Filter.css';

const FilterByComparison = () => {
  const { setFilterComparison } = useContext(StarWars);
  const [comparison, setComparison] = useState('');
  const [options] = useState(['maior que', 'igual a', 'menor que']);

  const handleChanges = ({ target }) => {
    setComparison(target.value);
    setFilterComparison(target.value);
  };

  return (
    <div>
      <select
        className="dropdown"
        data-testid="comparison-filter"
        name="comparison-filter"
        value={ comparison }
        onChange={ handleChanges }
      >
        { options.map((option) => (
          <option data-testid={ option } key={ option }>{option}</option>)) }
      </select>
    </div>
  );
};

export default FilterByComparison;
