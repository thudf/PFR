import axios from 'axios';
import {API_URL} from '@env';

const api = axios.create({
  baseURL: `${API_URL}`,
  // baseURL: 'https://carolina.g3infotech.app',
});
export default api;
