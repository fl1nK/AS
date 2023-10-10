const axios = require('axios');

const getTokenData = {
    // grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
    grant_type: 'password',
    username: 'filonenkovlad@gmail.com',
    password: 'Qwerty123',
    audience: 'https://dev-rk1t874k8t8hyiky.us.auth0.com/api/v2/',
    scope: 'offline_access',
    client_id: 'Q4znBfWauNXYNvJjMkT7VKCBzhGHLtC2',
    client_secret: 'Ri7cVPMWzOVsF-zBkddJJEoAAEUB7tzAbm4aW6gWO3RuSy4ZWQjpdOzcCoNZPTPu',
    // realm: 'Username-Password-Authentication',
};

axios
    .post('https://dev-rk1t874k8t8hyiky.us.auth0.com/oauth/token', getTokenData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then((response) => {
        const info = response.data;
        console.log('step 1:', info);

        const refreshTokenData = {
            method: 'post',
            url: `https://dev-rk1t874k8t8hyiky.us.auth0.com/oauth/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${info.access_token}`,
            },
            data: {
                grant_type: 'refresh_token',
                audience: 'https://dev-rk1t874k8t8hyiky.us.auth0.com/api/v2/',
                client_id: 'Q4znBfWauNXYNvJjMkT7VKCBzhGHLtC2',
                client_secret: 'Ri7cVPMWzOVsF-zBkddJJEoAAEUB7tzAbm4aW6gWO3RuSy4ZWQjpdOzcCoNZPTPu',
                refresh_token: `${info.refresh_token}`,
            },
        };

        axios
            .request(refreshTokenData)
            .then((res) => {
                console.log('step 2: ', res.data);
            })
            .catch((error) => {
                console.error('Error step 2:', error.response.data);
            });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
