const http = require('http');
const fs = require('fs');

// Launch chrome with cdp and catch console/exceptions
const { spawn } = require('child_process');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--user-data-dir=C:\\Users\\ssingla\\AppData\\Local\\Temp\\chrome_debug_err',
  'http://localhost:5173/'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9223/json/list', (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const list = JSON.parse(body);
      const target = list.find(t => t.url.includes('5173'));
      if (!target) {
        console.log('No 5173 target in', list);
        chromeProc.kill();
        return;
      }

      console.log('Target found:', target.url);
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Log.enable' }));
        ws.send(JSON.stringify({ id: 4, method: 'Network.enable' }));
      };

      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.method === 'Runtime.consoleAPICalled') {
          console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' '));
        }
        if (msg.method === 'Runtime.exceptionThrown') {
          console.error('[BROWSER EXCEPTION]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails);
        }
        if (msg.method === 'Network.responseReceived') {
          if (msg.params.response.status >= 400) {
            console.error('[HTTP ERROR]', msg.params.response.status, msg.params.response.url);
          }
        }
      };

      setTimeout(() => {
        ws.close();
        chromeProc.kill();
        process.exit(0);
      }, 5000);
    });
  }).on('error', (err) => {
    console.error('HTTP get error:', err);
    chromeProc.kill();
  });
}, 2000);
