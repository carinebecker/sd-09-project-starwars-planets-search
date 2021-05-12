import React, { useState, useContext, useEffect } from 'react';
import StarwarsContext from '../context/StarwarsContext';

const Table = () => {
  const { planets, fetchPlanets, isFetching, tableHeaders } = useContext(StarwarsContext);
  

  

  useEffect(() =>{
    // filterTableHeads();
    fetchPlanets();
    console.log('useEffect table');
    console.log(planets);
    console.log(isFetching);
  }, []);
  return (
    <div>
      {(isFetching) ? 'Loading...'
        : <table>
            <thead>
              <tr>
                {tableHeaders.map((header) => <th>{ header }</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
              {/* {planets.map((header) => <th>{ header }</th>)} */}
              </tr>
            </tbody>
          </table>}
    </div>
  );
};

export default Table;
