import axios from 'axios';

export default axios.create({
    baseURL: 'http://pharmacy-system-backend:8080'
})