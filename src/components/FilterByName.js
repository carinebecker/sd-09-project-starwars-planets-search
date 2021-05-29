import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
// import { fetchPlanets } from '../services/starWarsPlanetsAPI';

function FilterByName() {
  const { filters: { filterByName: name },
    setName,
    data,
    // filterdData,
    setFilteredData,
    // setIsFetching,
  } = useContext(MyContext);

  function handleChange({ target: { value } }) {
    setName(value);
    // fetchPlanetsByName(name).then((json) => setData(json.results));
  }

  useEffect(() => {
    if (name !== '') {
      setFilteredData(data.filter((item) => item.name.includes(name)));
    } else {
      setFilteredData(data);
    }
  }, [name]);

  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ name }
      onChange={ handleChange }
    />
  );
}

export default FilterByName;
