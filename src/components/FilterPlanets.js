import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const FilterPlanets = () => {
  const { data, activateButton, column, comparison, value } = useContext(AppContext);

  if (activateButton === true) {
    const filtered = initialData.filter((itens) => {
      console.log(itens);
      if (comparison === 'maior que') return itens[column] > value;
      if (comparison === 'igual a') return itens[column] === value;
      if (comparison === 'menor que') return itens[column] < value;
    });
    console.log(filtered);
  }
};

export default FilterPlanets;
