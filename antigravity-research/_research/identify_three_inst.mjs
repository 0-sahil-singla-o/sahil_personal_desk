async function inspectThree() {
  const three = await import('./downloaded_site/assets/three.module-CUjkK1mn.js');
  for (const [k, v] of Object.entries(three)) {
    if (typeof v === 'function') {
      try {
        const inst = new v();
        const isKeys = Object.keys(inst).filter(key => key.startsWith('is'));
        console.log(`Export ${k}: instance properties ->`, isKeys, inst.type || '');
      } catch (e) {
        console.log(`Export ${k}: function (constructor failed: ${e.message})`);
      }
    } else {
      console.log(`Export ${k}: ${typeof v} = ${JSON.stringify(v)}`);
    }
  }
}
inspectThree();
