import { defineConfig } from 'vite';

const mockData = {
  receipts: {
    count: 89,
    latest: [
      {
        id: Date.now(),
        lines: [
          "SAHIL'S LAB DOCKET",
          "PURCHASE DOCKET 044902",
          new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          "Client: Sahil Singla Labs",
          "--",
          "3D Procedural Desk",
          "  1.0 set x $420.00\t$420.00",
          "WebGL / Three.js Engine",
          "  1.0 lic x $380.00\t$380.00",
          "--",
          "TOTAL\t$800.00",
          "GST included\t$72.73",
          "PAID\tEFT",
          "--",
          "Weighed in front of you. Thank you."
        ]
      }
    ]
  },
  plant: {
    waters: 524,
    lastWatered: Date.now()
  },
  diary: {
    pages: [
      {
        id: "mvta3kcg2d8e7c",
        name: "Sahil",
        text: "Welcome to my desk! Everything here is real, procedural, and interactive.",
        drawing: false,
        at: Date.now() - 3600000
      },
      {
        id: "mvtc8tiyc9e2bc",
        name: "Visitor",
        text: "What an amazing 3D desk! Great engineering work.",
        drawing: false,
        at: Date.now() - 7200000
      }
    ]
  },
  poll: {
    poll: {
      id: "mvvz0hnf",
      question: "What should go on my desk next?",
      options: [
        {
          label: "Mini PS5",
          icon: "gamepad",
          about: "Plug it into my laptop and play here with friends. Your phone is the controller.",
          votes: 46
        },
        {
          label: "Polaroid camera",
          icon: "camera",
          about: "Take a photo with your camera. It prints as a polaroid and stays on my desk.",
          votes: 19
        },
        {
          label: "Hot Wheels loop",
          icon: "car",
          about: "A loop track on the desk. Race a little car and set the fastest lap.",
          votes: 21
        }
      ],
      endsAt: Date.now() + 86400000 * 7,
      total: 86,
      over: false
    },
    mine: null
  },
  feed: {
    count: 5,
    meals: [
      {
        id: "meal_1",
        name: "Sahil",
        note: "Fed the cat a healthy lunch 🐟",
        meal: "snack",
        at: Date.now() - 1800000
      }
    ]
  }
};

export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: false,
    watch: {
      ignored: ['**/assets/**', '**/public/assets/**']
    }
  },
  plugins: [
    {
      name: 'mock-api-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0];

          if (url === '/api/receipts') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(mockData.receipts));
          }
          if (url === '/api/plant') {
            if (req.method === 'POST') {
              mockData.plant.waters += 1;
              mockData.plant.lastWatered = Date.now();
            }
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(mockData.plant));
          }
          if (url === '/api/diary') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(mockData.diary));
          }
          if (url === '/api/poll') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(mockData.poll));
          }
          if (url === '/api/feed') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(mockData.feed));
          }
          if (url === '/api/songs') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ songs: [], mine: null }));
          }

          next();
        });
      }
    }
  ]
});
