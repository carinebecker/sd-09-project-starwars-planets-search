import { useContext, useState, useEffect } from 'react';
import { TableContext } from '../contexts/TableContext';
import useFilterName from './useFilterName';

const useFilterChoice = () => {
  const {
    data, name, filterChoiceReturn, setFilterChoiceReturn,
  } = useContext(TableContext);
  const [filterNameReturn] = useFilterName();
  const [listChoices, setListChoices] = useState([]);

  useEffect(() => {
    let showPlanets = [];
    if (name.length === 0) {
      showPlanets = data;
    } else {
      showPlanets = filterNameReturn;
    }
    if (listChoices.length > 1) {
      console.log('entro');
      filterChoiceReturn.forEach((lisPlanets) => {
        showPlanets = lisPlanets;
      });
    }

    let finalPlanets = [];
    finalPlanets = listChoices.map((choice) => {
      switch (choice.comp) {
      case 'menor que':
        return showPlanets.filter((planet) => parseInt(planet[choice.col], 10)
        < parseInt(choice.val, 10));
      case 'maior que':
        return showPlanets.filter((planet) => parseInt(planet[choice.col], 10)
         > parseInt(choice.val, 10));
      case 'igual a':
        return showPlanets.filter((planet) => parseInt(planet[choice.col], 10)
         === parseInt(choice.val, 10));
      default:
        break;
      }
      return showPlanets;
    });
    setFilterChoiceReturn(finalPlanets);
  }, [
    data, filterNameReturn, listChoices, name.length,
  ]);
  return [listChoices, setListChoices];
};

export default useFilterChoice;
