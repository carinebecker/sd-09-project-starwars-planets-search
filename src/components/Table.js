import React, { useContext, useEffect } from 'react';
import AppContext from '../appContext/Context';
import RenderRow from '../appContext/RenderRow';
import ClearFilter from './ClearFilter';
import FilterAscOrDesc from './FilterAscOrDesc';
import Principal from './PrincipalFilter';
import RenderHeader from './RenderHeader';

const Table = () => {
  const { setData } = useContext(AppContext);
  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setData(results);
    };
    getPlanets();
  }, [setData]);

  return (
    <table>
      <tbody>
        { RenderHeader() }
      </tbody>
      <tbody>
        { RenderRow() }
      </tbody>
      { ClearFilter() }
      { FilterAscOrDesc() }
      { Principal() }
    </table>
  );
};

export default Table;
