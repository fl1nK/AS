const axios = require('axios');
const express = require('express');

const app = express();

const port = 3000;
const CLIENT_ID = '';

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.redirect(
        'https://dev-rk1t874k8t8hyiky.us.auth0.com/authorize?client_id=Q4znBfWauNXYNvJjMkT7VKCBzhGHLtC2&redirect_uri=http://localhost:3000/callback&response_type=code&response_mode=query',
    );
});

app.get('/logout', (req, res) => {
    res.redirect(
        'https://dev-rk1t874k8t8hyiky.us.auth0.com/v2/logout?returnTo=http://localhost:3000&client_id=Q4znBfWauNXYNvJjMkT7VKCBzhGHLtC2',
    );
});

app.get('/callback', (req, res) => {
    console.log(req.query);

    const { code } = req.query;
    console.log(code);
    if (!code) {
        res.json({ message: 'Ви не авторизовані' });
        return;
    }

    const authorizationCodeData = {
        method: 'post',
        url: `https://dev-rk1t874k8t8hyiky.us.auth0.com/oauth/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            grant_type: 'authorization_code',
            audience: 'https://dev-rk1t874k8t8hyiky.us.auth0.com/api/v2/',
            client_id: 'Q4znBfWauNXYNvJjMkT7VKCBzhGHLtC2',
            client_secret: 'Ri7cVPMWzOVsF-zBkddJJEoAAEUB7tzAbm4aW6gWO3RuSy4ZWQjpdOzcCoNZPTPu',
            code: code,
            redirect_uri: 'http://localhost:3000/callback',
        },
    };

    axios
        .request(authorizationCodeData)
        .then((response) => {
            console.log('Authorization Code:', response.data);
            res.json({ responseData: response.data, logout: 'http://localhost:3000/logout' });
        })
        .catch((error) => {
            res.json({ message: 'Код невірний' });
            console.error('Error Authorization Code:', error);
        });
});
