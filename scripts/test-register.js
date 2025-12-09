const https = require('https');

const data = JSON.stringify({
    email: 'testuser@example.com',
    password: 'password123',
    name: 'Test User'
});

const options = {
    hostname: 'basic-hono-api.borisbelmarm.workers.dev',
    path: '/auth/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Testing registration with testuser@example.com / password123 ...');

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
