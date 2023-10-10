const axios = require('axios');

const auth0Domain = 'dev-rk1t874k8t8hyiky.us.auth0.com';

const getToken = {
    client_id: 'Q4znBfWauNXYNvJjMkT7VKCBzhGHLtC2',
    client_secret: 'Ri7cVPMWzOVsF-zBkddJJEoAAEUB7tzAbm4aW6gWO3RuSy4ZWQjpdOzcCoNZPTPu',
    audience: 'https://dev-rk1t874k8t8hyiky.us.auth0.com/api/v2/',
    grant_type: 'client_credentials',
};

axios
    .post(`https://${auth0Domain}/oauth/token`, getToken, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then((response) => {
        const info = response.data;
        console.log('step 1:', info);

        const createUser = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://${auth0Domain}/api/v2/users`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${info.access_token}`,
            },
            data: {
                email: 'filonenkovlad@gmail.com',
                given_name: 'Vlad',
                family_name: 'Filonenko',
                name: 'Vlad Filonenko',
                nickname: 'filonenkovlad',
                connection: 'Username-Password-Authentication',
                password: 'FilonenkoVlad123',
            },
        };

        axios
            .request(createUser)
            .then((res) => {
                console.log('step 2: ', res.data);
            })
            .catch((error) => {
                console.error('Error step 2:', error.response.data);
            });
    })
    .catch((error) => {
        console.error('Error step 1:', error.response.data);
    });
