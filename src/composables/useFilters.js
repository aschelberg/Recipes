import useApi from '@/composables/useApi.js';

const useFilters = () => {
  const { request } = useApi();

  const getCategories = async (id) => {
    const { data } = await request(`/list.php?c=list`)

    return data
  }
  const getIngredients = async (id) => {
    const { data } = await request(`/list.php?i=list`)

    return data
  }

  return {
    getCategories,
    getIngredients,
  };
};

export default useFilters;