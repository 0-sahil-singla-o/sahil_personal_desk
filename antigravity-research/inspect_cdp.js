const http = require('http');
const fs = require('fs');

http.get('http://127.0.0.1:9222/json/list', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const list = JSON.parse(body);
    const target = list.find(t => t.url.includes('8080'));
    if (!target) {
      console.log('Target not found', list);
      return;
    }
    console.log('Connecting to target ws:', target.webSocketDebuggerUrl);
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    ws.on('open', () => {
      console.log('WS opened');
      // Enable console & Page
      ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
      
      setTimeout(() => {
        // Capture screenshot
        ws.send(JSON.stringify({ id: 4, method: 'Page.captureScreenshot', params: { format: 'png' } }));
      }, 2000);
    });

    ws.on('message', (data) => {
      const msg = JSON.parse(data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('CONSOLE:', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.log('EXCEPTION:', JSON.stringify(msg.params.exceptionDetails));
      }
      if (msg.id === 4 && msg.result && msg.result.data) {
        fs.writeFileSync('page_screenshot.png', Buffer.from(msg.result.data, 'base64'));
        console.log('Saved page_screenshot.png (size:', msg.result.data.length, ')');
        ws.close();
        process.exit(0);
      }
    });

    ws.on('error', (err) => console.error('WS Error:', err));
  });
});
