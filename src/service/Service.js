import axios from 'axios';
const REST_API_BASE_URL = 'http://localhost:8080/api/cats';

export const listCats = () => axios.get(REST_API_BASE_URL);

export const addCat = (cat) => axios.post(REST_API_BASE_URL, cat);

export const getCat = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const updateCat = (id, cat) => axios.put(REST_API_BASE_URL + '/' + id, cat);

export const deleteCat = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
