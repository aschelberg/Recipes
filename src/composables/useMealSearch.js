import useApi from '@/composables/useApi.js';

const useMealSearch = () => {
  const { request } = useApi();

  const getMealByName = async (name) => {
    const { data } = await request(`/search.php?s=${name}`)
    return data
  }

  

  return {
    getMealByName
  };
};

export default usePokemon;