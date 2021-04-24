import React, { useContext, useState } from 'react';
import { TableContext } from '../contexts/TableContext';
import useFilterName from '../hooks/useFilterName';
import useFilterChoice from '../hooks/useFilterChoice';

function Table() {
  const { data } = useContext(TableContext);
  const [NameSearch, setNameSearch, filterNameReturn] = useFilterName();
  const [listChoices, setListChoices, filterChoiceReturn] = useFilterChoice();
  const firstPlanet = data[0] || [];
  const namesKeys = Object.keys(firstPlanet);
  const [filterCol, setfilterCol] = useState('rotation_period');
  const [filterComp, setFilterComp] = useState('maior que');
  const [filterVal, setFilterVal] = useState(0);
  const [addFiltersActive, setAddFiltersActive] = useState(false);

  const receiveFilters = () => {
    // se eu removo o [] e deicho sem tipagem ele nao reclama
    let filter = [];
    console.log(NameSearch);
    if (addFiltersActive === true) {
      if (listChoices.length > 0) {
        filterChoiceReturn.forEach((lisPlanets) => {
          filter = lisPlanets;
        });
        return filter;
      }
    } else {
      if (filterNameReturn.length > 0) {
        filter = filterNameReturn;
        return filter;
      }
      filter = data;
      return filter;
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'textInput':
      return setNameSearch(value);
    case 'filterColum':
      return setfilterCol(value);
    case 'filterComparison':
      return setFilterComp(value);
    case 'filterValue':
      return setFilterVal(value);
    default:
      break;
    }
  };

  function addFilterElement() {
    const newChoice = {
      filterColum: filterCol,
      filterComparison: filterComp,
      filterValue: filterVal,
    };
    // ativa filtros
    // setFilterFinal(filterChoiceReturn.length - 1);
    setAddFiltersActive(true);

    // listChoices foi trocado por listOptions apenas aquic
    setListChoices((listOptions) => [...listOptions, newChoice]);
  }

  const handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'add') {
      addFilterElement();
    } else {
      console.log('clicou no drop', name);
    }
  };

  // const dropFilterElement = () => {
  // função a declarar
  // }

  function createTextInput() {
    return (
      <input data-testid="name-filter" name="textInput" onChange={ handleChange } />
    );
  }

  const createDropdonwTags = () => {
    const maxLenght = 8;
    const namesSelect = namesKeys.filter((nameItem) => (nameItem.length >= maxLenght));
    return (
      <select data-testid="column-filter" name="filterColum" onChange={ handleChange }>
        { namesSelect.map((dropdownName, indexDropdown) => (
          <option key={ indexDropdown }>{ dropdownName }</option>
        )) }
      </select>
    );
  };

  const createDropdonwInterval = () => {
    const intervalCondition = ['maior que', 'menor que', 'igual a'];
    return (
      <select
        data-testid="comparison-filter"
        name="filterComparison"
        onChange={ handleChange }
      >
        { intervalCondition.map((comparison, indexcomparison) => (
          <option key={ indexcomparison }>{ comparison }</option>
        )) }
      </select>
    );
  };

  function createNumberInput() {
    return (
      <input
        data-testid="value-filter"
        type="number"
        name="filterValue"
        onChange={ handleChange }
      />
    );
  }

  function createButtonAddFilter() {
    return (
      <button
        data-testid="button-filter"
        name="add"
        type="button"
        onClick={ handleClick }
      >
        Add Filter
      </button>
    );
  }

  // const createButtonDropFilter = () => {
  //   return (
  //   );
  // };

  function createInputListFilter() {
    return (
      <>
        { createDropdonwTags() }
        { createDropdonwInterval() }
        { createNumberInput() }
        { createButtonAddFilter() }
      </>
    );
  }

  function createFilterElements() {
    let showfilters = [];
    // nao sei pq o .length do listChoices vindo do useFilterChoice da indefinido
    // acho que era a ordem no hook
    if (listChoices.length !== 0) {
      showfilters = listChoices;
    }
    return showfilters.map((element, indexFilter) => (
      <tr data-testid="filter" key={ indexFilter }>
        <td>{ element.filterColum }</td>
        <td>{ element.filterComparison }</td>
        <td>{ element.filterValue }</td>
        <td>
          <button
            name={ element.filterColum }
            type="button"
            onClick={ handleClick }
          >
            x
          </button>
        </td>
      </tr>
    ));
  }

  function createTableHeader() {
    return namesKeys.map((columName, index) => (
      <th key={ index }>{ columName }</th>
    ));
  }

  const createTableLines = () => {
    const content = receiveFilters();
    return content.map((planet, indexLine) => (
      <tr key={ indexLine }>
        {
          Object.values(planet).map((values, indexCell) => (
            <td key={ indexCell }>{ values }</td>
          ))
        }
      </tr>
    ));
  };

  return (
    <>
      <div>
        { createTextInput() }
      </div>
      <div>
        { createInputListFilter() }
      </div>
      <table>
        <tbody>
          { createFilterElements() }
        </tbody>
      </table>
      <div>
        <table>
          <thead>
            <tr>
              { createTableHeader() }
            </tr>
          </thead>
          <tbody>
            { createTableLines() }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
