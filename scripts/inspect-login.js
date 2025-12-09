const https = require('https');

const data = JSON.stringify({
    email: 'testuser@example.com',
    password: 'password123'
});

const options = {
    hostname: 'basic-hono-api.borisbelmarm.workers.dev',
    path: '/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Testing login response structure...\n');

const req = https.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('Full response:');
        console.log(JSON.stringify(JSON.parse(responseData), null, 2));
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
