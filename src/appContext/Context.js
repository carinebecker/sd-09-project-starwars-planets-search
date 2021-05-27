import { createContext } from 'react';

export const initialState = {
  filters:
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: 'population',
          comparison: 'maior que',
          value: '100000',
        },
      ],
    },
};

const AppContext = createContext();

export default AppContext;
