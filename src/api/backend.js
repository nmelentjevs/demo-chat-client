import axios from 'axios';
import { backend } from '../config';

const instance = axios.create({
  baseURL: backend.endpoint
});

export default instance;
