import { useContext, useState, useEffect } from 'react';
import { TableContext } from '../contexts/TableContext';
import useFilterName from './useFilterName';

const useFilterChoice = () => {
  const { data } = useContext(TableContext);
  const [nameSearch, setNameSearch, filterNameReturn] = useFilterName();
  const [listChoices, setListChoices] = useState([]);
  const [filterChoiceReturn, setFilterChoiceReturn] = useState();
  console.log(setNameSearch);
  // console.log(listChoices);
  // console.log(listChoices.length);
  // recebe os filterChoice do table
  // depois add ele no list choices
  // depois filtra tudo
  // depois retorna

  useEffect(() => {
    let showPlanets = filterNameReturn;
    // console.log(showPlanets)

    if (nameSearch.length === 0) {
      showPlanets = data;
    }

    // console.log('inicial', showPlanets)
    // setListChoices([filterChoice]);
    let finalPlanets = [];
    finalPlanets = listChoices.map((choice) => {
      switch (choice.filterComparison) {
      case 'menor que':
        return showPlanets.filter((planet) => parseInt(planet[choice.filterColum], 10)
         < parseInt(choice.filterValue, 10));
      case 'maior que':
        return showPlanets.filter((planet) => parseInt(planet[choice.filterColum], 10)
         > parseInt(choice.filterValue, 10));
      case 'igual a':
        return showPlanets.filter((planet) => parseInt(planet[choice.filterColum], 10)
         === parseInt(choice.filterValue, 10));
      default:
        break;
      }
      return showPlanets;
    });
    setFilterChoiceReturn(finalPlanets);
  }, [data, filterNameReturn, listChoices, nameSearch.length]);
  return [listChoices, setListChoices, filterChoiceReturn];
};

export default useFilterChoice;
