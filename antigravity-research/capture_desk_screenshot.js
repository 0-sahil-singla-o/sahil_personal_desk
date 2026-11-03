const http = require('http');
const fs = require('fs');

http.get('http://127.0.0.1:9222/json/list', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const list = JSON.parse(body);
    const target = list.find(t => t.url.includes('5173'));
    if (!target) {
      console.log('Target 5173 not found', list);
      return;
    }
    console.log('Connecting to ws:', target.webSocketDebuggerUrl);
    const ws = new WebSocket(target.webSocketDebuggerUrl);

    ws.onopen = () => {
      console.log('Connected to target via CDP!');
      ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));

      // Wait 3 seconds for 3D desk rendering & paint
      setTimeout(() => {
        console.log('Requesting screenshot...');
        ws.send(JSON.stringify({ id: 4, method: 'Page.captureScreenshot', params: { format: 'png' } }));
      }, 3500);
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('CONSOLE [' + msg.params.type + ']:', msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('EXCEPTION:', JSON.stringify(msg.params.exceptionDetails));
      }
      if (msg.id === 4 && msg.result && msg.result.data) {
        fs.writeFileSync('desk_live_capture.png', Buffer.from(msg.result.data, 'base64'));
        console.log('SUCCESS: Captured desk_live_capture.png! Byte size:', msg.result.data.length);
        ws.close();
        process.exit(0);
      }
    };

    ws.onerror = (err) => console.error('WS Error:', err);
  });
});
