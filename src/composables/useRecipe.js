import useApi from '@/composables/useApi.js';

const useRecipe = () => {
  const { request } = useApi();

  const getById = async (id) => {
    const { data } = await request(`/lookup.php?i=${id}`)
    return data.meals
  }

  const getRandom = async () => {
    const { data } = await request('random.php')
    return data.meals
  }
  
  const getBySearch = async (s) => {
    const { data } = await request(`/search.php?s=${s}`)
    return data.meals
  }
  const getByMainIngredient = async (i) => {
    const { data } = await request(`/filter.php?i=${i}`)
    return data.meals
  }
  const getByCategory = async (c) => {
    const { data } = await request(`/filter.php?c=${c}`)
    return data.meals
  }

  const getAllByTerm = async (searchFilter) => {
    const response = await Promise.all([getBySearch(searchFilter), getByMainIngredient(searchFilter), getByCategory(searchFilter)]);

    return response;
  }


  return {
    getById,
    getRandom,
    getBySearch,
    getByMainIngredient,
    getByCategory,
    getAllByTerm
  };
};

export default useRecipe;