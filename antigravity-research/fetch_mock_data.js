const https = require('https');
const fs = require('fs');

const endpoints = [
  '/api/receipts',
  '/api/plant',
  '/api/diary',
  '/api/songs?all=1',
  '/api/poll',
  '/api/feed?wall=1'
];

async function fetchEndpoint(ep) {
  return new Promise((resolve) => {
    https.get('https://www.pradiplabs.dev' + ep, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ ep, status: res.statusCode, json });
        } catch (e) {
          resolve({ ep, status: res.statusCode, text: data.slice(0, 100) });
        }
      });
    }).on('error', err => resolve({ ep, error: err.message }));
  });
}

async function run() {
  const results = {};
  for (const ep of endpoints) {
    const res = await fetchEndpoint(ep);
    console.log(`Endpoint ${ep} status:`, res.status);
    results[ep] = res.json || res.text;
  }
  fs.writeFileSync('mock_api_data.json', JSON.stringify(results, null, 2));
  console.log('Saved mock_api_data.json');
}

run();
