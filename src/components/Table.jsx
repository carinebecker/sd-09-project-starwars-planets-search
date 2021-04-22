import React, { useContext, useEffect } from 'react';
import SWContext from '../context/SWContext';

function Table() {
  const { loading, getData, planets, renderTable } = useContext(SWContext);

  useEffect(() => {
    if (!planets) {
      getData();
    }
  });

  return (
    <div>
      {loading && !planets ? 'loading...' : renderTable(planets)}
    </div>
  );
}

export default Table;
