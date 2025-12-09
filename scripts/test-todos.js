const https = require('https');

// First login to get token
const loginData = JSON.stringify({
    email: 'testuser@example.com',
    password: 'password123'
});

const loginOptions = {
    hostname: 'basic-hono-api.borisbelmarm.workers.dev',
    path: '/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
    }
};

console.log('Logging in to get token...');

const req = https.request(loginOptions, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const json = JSON.parse(data);
        const token = json.data ? json.data.token : json.token;

        if (!token) {
            console.error('Failed to get token:', json);
            return;
        }

        console.log('Got token, fetching todos...');
        fetchTodos(token);
    });
});

req.write(loginData);
req.end();

function fetchTodos(token) {
    const options = {
        hostname: 'basic-hono-api.borisbelmarm.workers.dev',
        path: '/todos',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const req = https.request(options, (res) => {
        console.log(`Todos StatusCode: ${res.statusCode}`);
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.end();
}
