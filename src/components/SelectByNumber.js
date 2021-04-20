import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SelectByNumber() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const INITIAL_FILTER = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };

  return (
    <div>
      Teste de renderização
    </div>
  );
}

export default SelectByNumber;
