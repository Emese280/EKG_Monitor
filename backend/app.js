require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');

const sequelize = require('./config/database');
const Patient = require('./models/Patient');
const vitalSignRoutes = require('./routes/vitalSignRoutes');
const patientRoutes = require('./routes/patientRoutes');
const { initSocketHandler } = require('./websocket/socketHandler');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    service: 'vitals-dashboard-backend',
    status: 'ok',
    websocket: `ws://localhost:${PORT}`,
    api: '/api/vitals',
  });
});

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(204).end();
});

// REST API routes (MVC)
app.use('/api/vitals', vitalSignRoutes);
app.use('/api/patients', patientRoutes);

// Single-localhost mode: backend serves the frontend build.
const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
const hasFrontendBuild = fs.existsSync(path.join(frontendDistPath, 'index.html'));

if (hasFrontendBuild) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(503).json({
      message: 'Frontend build missing. Run "npm run build" in the frontend folder.',
    });
  });
}

// WebSocket handler
initSocketHandler(io);

sequelize
  .sync()
  .then(async () => {
    console.log('Sikeresen csatlakozva az adatbázishoz');

    const count = await Patient.count();
    if (count === 0) {
      await Patient.create({ code: 'APL-001', name: 'Demo Paciens', isActive: true });
      console.log('[DB] Alapertelmezett paciens letrehozva: APL-001');
    }

    server.listen(PORT, () => {
      console.log(`Backend szerver fut: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Adatbázis hiba:', err);
    process.exit(1);
  });
