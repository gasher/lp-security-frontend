import axios from 'axios';
import apiConfig from '../config';

export default axios.create(apiConfig.api);
