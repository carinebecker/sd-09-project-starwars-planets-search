import React, { useContext, useEffect } from 'react';
import AppContext from '../appContext/Context';
import headerNames from '../data/headerNames';

const Header = () => {
  const { data, setData, name } = useContext(AppContext);
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
      const initialData = data.filter((teste) => {
        if (name.length > 0) {
          return teste.name.includes(name);
        }
        return data;
      });

      const noFilter = initialData.map((planets) => (
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
      return noFilter;
    }
    return <div>Loading...</div>;
  };

  return (
    <table>
      <tbody>
        { renderHeader() }
      </tbody>
      <tbody>
        { renderRow() }
      </tbody>
    </table>
  );
};

export default Header;
