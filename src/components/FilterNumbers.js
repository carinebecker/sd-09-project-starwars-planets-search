const initialState = filterByName.filter((itens) => {
  if (activateButton === true) {
    console.log(value);
    if (comparison === 'maior que') return itens[column] > value;
    if (comparison === 'igual a') return itens[column] === value;
    if (comparison === 'menor que') return itens[column] < value;
  }
  return data;
});