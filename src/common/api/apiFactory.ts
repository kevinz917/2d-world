import axios from 'axios';
import { BASE } from './base';

const api = axios.create();

api.defaults.baseURL = BASE;

export default api;
