import axios from 'axios';

axios.defaults.baseURL = 'https://clyp-solutio.herokuapp.com/'
// axios.defaults.baseURL = 'http://127.0.1.1/5000'
axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
export default axios;