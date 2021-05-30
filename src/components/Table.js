import React, { useContext, useEffect } from 'react';
import AppContext from '../appContext/Context';
import RenderRow from '../appContext/RenderRow';
import ClearFilter from './ClearFilter';
import FilterAscOrDesc from './FilterAscOrDesc';
import Principal from './PrincipalFilter';
import RenderHeader from './RenderHeader';

const Table = () => {
  const { setData, column, data, sequence } = useContext(AppContext);
  const negativeOne = -1;
  let negative = negativeOne;
  let positive = 1;
  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setData(results);
    };
    getPlanets();
  }, [setData]);

  if (sequence === 'DESC') {
    negative = 1;
    positive = negativeOne;
  }
  const orderBy = () => {
    if (column === 'name') {
      data.sort((a, b) => {
        if (a.name < b.name) return negative;
        if (a.name > b.name) return positive;
        return 0;
      });
    }
  };

  if (data) orderBy();

  return (
    <table>
      <tbody>
        { RenderHeader() }
      </tbody>
      <tbody>
        { RenderRow() }
      </tbody>
      { ClearFilter() }
      { Principal() }
      { FilterAscOrDesc() }
    </table>
  );
};

export default Table;
