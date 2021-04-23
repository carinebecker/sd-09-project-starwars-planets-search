const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const fetchPlanetsData = async () => (
  fetch(API_URL).then((response) => response.json())
);

export const makeOptionsObjectFrom = (valuesArray) => {
  const keys = ['value', 'key', 'name'];
  return valuesArray.map((value) => {
    const entries = keys.map((key) => [key, value]);
    return Object.fromEntries(entries);
  });
};

export const makePropObjectWith = (keysArray, valuesArray) => {
  const entriesArray = keysArray.map((key, index) => [key, valuesArray[index]]);
  return Object.fromEntries(entriesArray);
};

export const columnsProperties = {
  Name: 'text',
  'Rotation period': 'number',
  'Orbital period': 'number',
  Diameter: 'number',
  Climate: 'text',
  Gravity: 'text',
  Terrain: 'text',
  'Surface water': 'number',
  Population: 'number',
  Films: 'list',
  Created: 'date',
  Edited: 'date',
  URL: 'text',
};

export const COLUMNS_NAMES = Object.keys(columnsProperties);
