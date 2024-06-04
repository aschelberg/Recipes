import axios from 'axios';

const useApi = () => {
  const request = async (url, config = {}) => {
    const baseURL = config.baseURL || 'https://api.edamam.com/doc/open-api/';
    config.headers = config.headers || {};
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers
    };
    
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