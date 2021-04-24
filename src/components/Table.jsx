import React, { useContext, useState } from 'react';
import { TableContext } from '../contexts/TableContext';
import useFilterName from '../hooks/useFilterName';
import useFilterChoice from '../hooks/useFilterChoice';

function Table() {
  const { data, setName, filterChoiceReturn } = useContext(TableContext);
  const [filterNameReturn] = useFilterName();
  const [listChoices, setListChoices] = useFilterChoice();
  const firstPlanet = data[0] || [];
  const namesKeys = Object.keys(firstPlanet);
  const [column, setColumn] = useState('rotation_period');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [addFiltersActive, setAddFiltersActive] = useState(false);

  const receiveFilters = () => {
    let filter = [];
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
    const { name, value: valuex } = target;
    switch (name) {
    case 'textInput':
      return setName(valuex);
    case 'column':
      return setColumn(valuex);
    case 'comparison':
      return setComparison(valuex);
    case 'value':
      return setValue(valuex);
    default:
      break;
    }
  };

  function addFilterElement() {
    const newChoice = {
      col: column,
      comp: comparison,
      val: value,
    };
    setAddFiltersActive(true);
    setListChoices((listOptions) => [...listOptions, newChoice]);
  }

  const dropFilterElement = (itemFilter) => {
    if (listChoices.length > 0) {
      const dropOption = listChoices.filter((option) => (option.col !== itemFilter));
      setListChoices(dropOption);
      if (dropOption.length === 0) {
        setAddFiltersActive(false);
      }
    }
  };

  const handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'add') {
      addFilterElement();
    } else {
      console.log('clicou no drop', name);
      dropFilterElement(name);
    }
  };

  function createTextInput() {
    return (
      <input data-testid="name-filter" name="textInput" onChange={ handleChange } />
    );
  }

  const createDropdonwTags = () => {
    const maxLenght = 8;
    const namesSelect = namesKeys.filter((nameItem) => (nameItem.length >= maxLenght));

    if (listChoices.length > 0) {
      // let activeNames = []

      listChoices.forEach((choiceItem) => {
        const indexDodrop = namesSelect.indexOf(choiceItem.col);
        delete namesSelect[indexDodrop];
        // namesSelect.slice
        // activeNames = namesSelect.filter((nameSelec) => (nameSelec !== choiceItem.col))
      });

      // activeNames = listChoices.map((choiceItem) => (
      //   namesSelect.filter((nameSelec) => (nameSelec !== choiceItem.col))
      // ))
    //   console.log(activeNames)
      // console.log(namesSelect)
      // namesSelect = activeNames
    }

    return (
      <select data-testid="column-filter" name="column" onChange={ handleChange }>
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
        name="comparison"
        onChange={ handleChange }
      >
        { intervalCondition.map((compar, indexcomparison) => (
          <option key={ indexcomparison }>{ compar }</option>
        )) }
      </select>
    );
  };

  function createNumberInput() {
    return (
      <input
        data-testid="value-filter"
        type="number"
        name="value"
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
    if (listChoices.length !== 0) {
      showfilters = listChoices;
    }
    return showfilters.map((element) => (
      <p data-testid="filter" key={ element.col }>
        { `Filter by ${element.col} ${element.comp} ${element.val} ` }
        <button
          name={ element.col }
          type="button"
          onClick={ handleClick }
        >
          x
        </button>
      </p>
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
      <div>
        { createFilterElements() }
      </div>
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
