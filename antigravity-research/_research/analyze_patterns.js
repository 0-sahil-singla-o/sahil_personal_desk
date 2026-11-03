const fs = require('fs');
const s = fs.readFileSync('temp_deskscene.js', 'utf8');
console.log('@react-three/fiber:', /react-three|@react-three/i.test(s));
console.log('three canvas:', /<canvas|createElement\(['"]canvas/i.test(s));
console.log('lucide:', /lucide/i.test(s));
console.log('zustand:', /zustand|create\(\(set/i.test(s));
console.log('lenis:', /lenis/i.test(s));
console.log('gsap:', /gsap|TweenMax|to\(|fromTo\(/i.test(s));
