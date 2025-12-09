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

console.log('Testing login with testuser@example.com / password123 ...');

const req = https.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
