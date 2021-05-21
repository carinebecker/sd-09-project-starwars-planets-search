import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/api';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]); // Req 1
  const [namePlanets, setNamePlanets] = useState(''); // Req 2
  const [filterPlanets, setFilterPlanets] = useState(''); // Req 2
  const columnsOptions = ['population', 'orbital_period', // Req 3 - 3.1.2 - Opções do Coluna
    'diameter', 'rotation_period', 'surface_water'];
  const comparisonOptions = ['maior que', 'menor que', 'igual a']; // Req 3 - 3.2.1 - Opções do Cmparação
  const [preferenceFilter, setPreferenceFilter] = useState( // Req 3 - Setando valores iniciais do filtro
    {
      columnFilter: 'population',
      comparisonFilter: 'maior que',
      numberFilter: '100000',
    },
  );

  // Req 1 - 1.3 - Quero que chame a API assim que carregar a página (componentDidMount)
  useEffect(() => {
    getPlanets().then(({ results }) => { // Req 1 - 1.3.1 - Pego a API e já desestruturo o results - then é da sintaxe
      results.forEach((result) => delete result.residents); // Req 1 - 1.3.2 - o objetivo do foreach é pra usar essa propriedade 'delete' nativa do Js, para deletar o campo 'residents'
      setPlanets(results); // Req 1 - 1.3.3 - Atualizo o estado de Planets pela função SetPlanets
    });
  }, []);

  // Req 2 - 2.1 - Chamo a função que altera o estado de namePlanets (é uma handleChange do bloco 12)
  const handleNamePlanets = ({ target: { value } }) => {
    setNamePlanets(value); // 2.1.2 - Responsável por alterar o estado de Planets
  };

  // Req 2 - 2.2 - Aqui essa função vai ser chamada toda vez que planets e namePlanets for alterada
  useEffect(() => {
    const planetsForFilters = [...planets]; // 2.2.1 - Quero colocar o estado atual de planetas
    const planetsFilters = planetsForFilters // 2.2.2 - Aqui vou filtrar os planetas
      .filter((planet) => planet.name.includes((namePlanets))); // 2.2.3 - Vou filtrar um nome digitado com o objetão de planetas
    setFilterPlanets(planetsFilters); // 2.2.4 - Altera o estado atual de filterPlanets
  }, [planets, namePlanets]); // 2.2.5 - ComponentDidUpdate: Altera esses estados e vai chamar a parte de cima dessa função (planetsFilters + planetsForFilters)

  // Req 3 - Função que altera estado atual do {[]} de acordo com os dados selecionados
  const handlePreferenceFilter = ({ target: { name, value } }) => {
    setPreferenceFilter({ ...preferenceFilter, [name]: value });
  };

  // Ajuda do mestre Rafa Reis para pensar na lógica do filtro
  // Req 3 - 3.5 - Função que faz o filtro e atualiza os estados - pelo objeto que chega por preferenceFilter
  const filterByNumericValues = ({ columnFilter, comparisonFilter, valueFilter }) => { // Filtros de coluna, comparação e valor que vieram de preferenceFilter
    // console.log(valueFilter);
    console.log(columnFilter);
    const filter = planets.filter((planet) => { // Pego o array de planetas e faço um filtro
      const columnCompare = Number(planet[columnFilter]);
      const valueCompare = Number(valueFilter);
      // Req 4 fazer uma lógica que vai remover esse filtro de população
      // if (columnFilter = 'population') {
      //   ;
      // }
      if (comparisonFilter === 'maior que') {
        return columnCompare > valueCompare;
      }
      if (comparisonFilter === 'menor que') {
        return columnCompare < valueCompare;
      }
      return columnCompare === valueCompare;
    });
    setFilterPlanets(filter); // O resultado do filtro altera o estado de planetasFiltrados
  };

  const handleClickFilter = () => { // Função chamada no clique do botão
    filterByNumericValues(preferenceFilter);
    // console.log(preferenceFilter); // Objeto com propriedades column, comparison, number, value
  };
  // Req 1 - 1.4 - Aqui envio os estados atuais para todos os componentes
  const contextValue = {
    planets, // Req 1 - 1.5 - Envio o estado de planets que é um array já preenchido
    namePlanets, // Req 2
    handleNamePlanets, // Req 2
    filterPlanets, // Req 2
    columnsOptions, // Req 3 - 3.1.3 - Envio as opções da coluna para o estado
    comparisonOptions, // Req 3 - 3.2.3 - Envio as opções de comparação para o estado
    preferenceFilter,
    handlePreferenceFilter,
    handleClickFilter,
  };

  return (
    // Req 1 - 1.6.1 - Vou prover, passar o estado atual dos componentes para toda a aplicação + os filhos (essa sintaxe do children é para abranger os componentes table e form)
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
