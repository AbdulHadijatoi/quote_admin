const isProduction = import.meta.env.MODE === 'production';
const baseUrl = isProduction
  ? import.meta.env.VITE_API_URL_PRODUCTION
  : import.meta.env.VITE_API_URL_LOCAL;

export default baseUrl;