import axios from 'axios';
import { getCurrentUser } from 'vuefire';

const useApi = () => {
  const request = async (url, config = {}) => {
    // const user = await getCurrentUser();
    const baseURL = config.baseURL || 'https://www.themealdb.com/api/json/v1/1';
    config.headers = config.headers || {};
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers
    };

    // if (baseURL === 'https://api.edamam.com/api/recipes/v2') {
    //   headers.Authorization = `Bearer ${user.accessToken}`
    // }
    
    delete config.headers;
    delete config.baseURL;

    try {
      return await axios({
        baseURL,
        url,
        ...config,
        headers
      });
    } catch (error) {
      console.log(error);
    };
  };

  return {
    request
  };
};

export default useApi;