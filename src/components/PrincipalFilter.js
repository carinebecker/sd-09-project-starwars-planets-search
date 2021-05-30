import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const Principal = () => {
  const { data, column, sequence } = useContext(AppContext);

  const orderBy = () => {
    if (sequence === 'DESC') data.sort((a, b) => Number(b[column] - Number(a[column])));
    if (sequence === 'ASC') data.sort((a, b) => Number(a[column] - Number(b[column])));
  };

  orderBy();
  return <div>Filtro principal</div>;
};

export default Principal;
