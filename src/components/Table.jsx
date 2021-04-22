import React, { useContext } from 'react';
import SWContext from '../context/SWContext';
import useData from '../effects/useData';

function Table() {
  const { loading, getData, data, renderTable } = useContext(SWContext);
  useData(data, getData);

  return (
    <div>
      {loading || !data ? 'loading...' : renderTable(data)}
    </div>
  );
}

export default Table;
