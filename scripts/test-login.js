const https = require('https');

const data = JSON.stringify({
    email: 'user1@example.com',
    password: '1234'
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

console.log('Testing login with user1@example.com / 1234 ...');

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
