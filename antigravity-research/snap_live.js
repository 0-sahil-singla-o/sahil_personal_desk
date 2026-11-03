const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--user-data-dir=C:\\Users\\ssingla\\AppData\\Local\\Temp\\chrome_snap',
  '--window-size=1280,800',
  'http://localhost:5173/'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9224/json/list', (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const list = JSON.parse(body);
      const target = list.find(t => t.url.includes('5173'));
      if (!target) {
        console.log('No 5173 target found');
        chromeProc.kill();
        return;
      }

      console.log('Connecting to target:', target.url);
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        // Wait 4 seconds for full render
        setTimeout(() => {
          console.log('Capturing screenshot...');
          ws.send(JSON.stringify({
            id: 3,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }, 4000);
      };

      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === 3 && msg.result && msg.result.data) {
          const buf = Buffer.from(msg.result.data, 'base64');
          fs.writeFileSync('C:/Users/ssingla/.gemini/antigravity/brain/33610cfa-d125-4f7c-b765-8e0df2ed1e3d/live_desk_proof.png', buf);
          console.log('SAVED live_desk_proof.png! Size:', buf.length);
          ws.close();
          chromeProc.kill();
          process.exit(0);
        }
      };
    });
  }).on('error', err => {
    console.error('HTTP error:', err);
    chromeProc.kill();
  });
}, 2000);
