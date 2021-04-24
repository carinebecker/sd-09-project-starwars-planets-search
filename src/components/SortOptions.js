import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import YodaContext from '../local_resources/Context';

const SortOptions = () => {
  const { order, setOrder } = useContext(YodaContext);
  const optionsSelected = order;
  const getSortData = ({ target }) => {
    optionsSelected[target.name] = target.value;
  };
  const executeSort = () => {
    setOrder({ ...order,
      column: optionsSelected.column,
      sort: optionsSelected.sort });
  };
  return (
    <Form inline>
      <div className="input-group-prepend">
        <div className="input-group-text input-group-sm">
          <label
            className="form-check-label"
            htmlFor="ASC"
          >
            ASC
            <input
              testid="column-sort-input-asc"
              onClick={ (evt) => getSortData(evt) }
              type="radio"
              name="sort"
              id="ASC"
              value="ASC"
              aria-label="Checkbox for following text input"
            />
          </label>
          <label className="form-check-label" htmlFor="DESC">
            DESC
            <input
              data-testid="column-sort-input-desc"
              onClick={ (evt) => getSortData(evt) }
              type="radio"
              name="sort"
              id="DESC"
              value="DESC"
              aria-label="Checkbox for following text input"
            />
          </label>
        </div>
      </div>
      <FormControl
        as="select"
        type="text"
        data-testid="column-sort"
        placeholder="Search by name"
        className="mr-sm-2"
        name="column"
        onChange={ (evt) => getSortData(evt) }
      >
        <option>name</option>
        <option>rotation_period</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>climate</option>
        <option>gravity</option>
        <option>terrain</option>
        <option>surface_water</option>
        <option>population</option>
        <option>films</option>
        <option>creation date</option>
        <option>edition date</option>
        <option>url</option>
      </FormControl>
      <Button
        data-testid="column-sort-button"
        variant="primary"
        type="button"
        size="md"
        onClick={ () => executeSort() }
      >
        Sort
      </Button>
    </Form>
  );
};
export default SortOptions;
