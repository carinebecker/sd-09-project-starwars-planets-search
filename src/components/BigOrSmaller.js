import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const BigOrSmaller = () => {
  const { setComparison } = useContext(AppContext);
  return (
    <select
      data-testid="comparison-filter"
      onChange={ ({ target }) => {
        setComparison(target.value);
      } }
    >
      <option value="maior que">maior que</option>
      <option value="igual a">igual a</option>
      <option value="menor que">menor que</option>
    </select>
  );
};

export default BigOrSmaller;
