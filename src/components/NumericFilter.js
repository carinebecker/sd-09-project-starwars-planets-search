import { useContext } from 'react';
import PlanetContext from '../context/context';

export default function useNumFilter(list) {
  const { filters } = useContext(PlanetContext);
  const { filterByNumericValues } = filters;
  let listing = [...list];

  if (filterByNumericValues.length > 0) {
    filterByNumericValues.forEach((item) => {
      const { column, comparison, value } = item;
      switch (comparison) {
      case 'maior que': {
        listing = list.filter((each) => parseInt(each[column], 10) > parseInt(value, 10));
        break;
      }
      case 'menor que': {
        listing = list.filter((each) => parseInt(each[column], 10) < parseInt(value, 10));
        break;
      }
      case 'igual a': {
        listing = list.filter(
          (each) => parseInt(each[column], 10) === parseInt(value, 10),
        );
        break;
      }
      default:
        return listing;
      }
    });
  }

  return [listing];
}
