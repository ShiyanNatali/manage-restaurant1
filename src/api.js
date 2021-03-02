import axios from 'axios';

export default axios.create({
    baseURL: 'https://5ee75f1cffee0c0016a12196.mockapi.io',
    headers: {
        'Content-Type': 'application/json',
    },
});
