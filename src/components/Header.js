import { render } from '@testing-library/react';
import React, { useContext, useEffect } from 'react';
import AppContext from '../appContext/Context';
import headerNames from '../data/headerNames';

const Header = () => {
  const { data, setData } = useContext(AppContext);
  useEffect(() => {
    const getPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setData(results);
    };
    getPlanets();
  }, [setData]);

  const renderHeader = () => (
    <tr>
      {
        headerNames.map((header) => (
          <td key={ header }>
            <th>{ header }</th>
          </td>))
      }
    </tr>
  );

  const renderRow = () => {
    if (data !== undefined) {
      console.log(data);
      return data.map((planets) => (
        <tr key={ planets.name }>
          <td>{ planets.name }</td>
          <td>{ planets.rotation_period }</td>
          <td>{ planets.orbital_period }</td>
          <td>{ planets.diameter }</td>
          <td>{ planets.climate }</td>
          <td>{ planets.gravity }</td>
          <td>{ planets.terrain }</td>
          <td>{ planets.surface_water }</td>
          <td>{ planets.population }</td>

        </tr>
      ));
    }
    return <div>Loading...</div>;
  };

  return (
    <table>
      <tbody>
        { renderHeader() }
      </tbody>
      <tbody>
        {renderRow() }
      </tbody>
    </table>
  );
};

export default Header;
