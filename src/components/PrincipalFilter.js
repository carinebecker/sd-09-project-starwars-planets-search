import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const Principal = () => {
  const { data, column, sequence } = useContext(AppContext);
  let ordered;
  const negativeOne = -1;

  const orderBy = () => {
    if (column === 'name') {
      ordered = data.sort((a, b) => {
        if (a.name < b.name) return negativeOne;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (sequence === 'DESC') {
      ordered = data.sort((a, b) => Number(b[column] - Number(a[column])));
    }
    return ordered;
  };

  if (data) orderBy();
  return <div>Filtro principal</div>;
};

export default Principal;
