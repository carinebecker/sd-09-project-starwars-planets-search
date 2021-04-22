import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

const Table = () => {
  const { data } = useContext(StarwarsContext);
  return (
    <div>
      heloo worls
      { console.log(data[0]) }
    </div>
  );
};

export default Table;
