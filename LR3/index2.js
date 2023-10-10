const axios = require('axios');

const getTokenData = {
    method: 'post',
    url: `https://dev-rk1t874k8t8hyiky.us.auth0.com/oauth/token`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
        client_id: 'Q4znBfWauNXYNvJjMkT7VKCBzhGHLtC2',
        client_secret: 'Ri7cVPMWzOVsF-zBkddJJEoAAEUB7tzAbm4aW6gWO3RuSy4ZWQjpdOzcCoNZPTPu',
        audience: 'https://dev-rk1t874k8t8hyiky.us.auth0.com/api/v2/',
        grant_type: 'client_credentials',
    },
};

axios
    .request(getTokenData)
    .then((response) => {
        const info = response.data;
        console.log('step 1:', info);

        const updatePasswordData = {
            method: 'PATCH',
            url: 'https://dev-rk1t874k8t8hyiky.us.auth0.com/api/v2/users/auth0|651c2f684f38d69074eb6200',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${info.access_token}`,
            },
            data: {
                password: 'Qwerty123',
            },
        };

        axios
            .request(updatePasswordData)
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
