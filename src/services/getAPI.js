const getAPI = async () => {
  try {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
    const obj = await response.json();
    return obj;
  } catch (error) {
    console.log(error);
  }
};

export default getAPI;
