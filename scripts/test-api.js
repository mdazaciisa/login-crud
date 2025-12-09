const https = require('https');

const url = 'https://basic-hono-api.borisbelmarm.workers.dev/health';

console.log(`Testing connection to ${url}...`);

https.get(url, (res) => {
    console.log('StatusCode:', res.statusCode);
    console.log('Headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
}).on('error', (e) => {
    console.error('Error:', e);
});
