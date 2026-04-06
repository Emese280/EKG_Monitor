# EKG monitor

Webalkalmazás, amely mutatja az életjeleket, mint az EKG-görbét, pulzust és vérnyomást és adatokat jelenít meg.

![EKG Monitor Screenshot](./screenshot.png)

# Technológiák

*Backend*
- Node.js + Express
- Socket.IO (WebSocket, valós idejű adatküldés)
- Sequelize ORM + MySQL (vagy SQLite fejlesztési módban)

*Frontend*
- React 18 (JSX nélkül, `React.createElement`)
- Chart.js + react-chartjs-2
- Vite (build tool)
- Socket.IO Client

# Projekt struktúra

```
├── backend/
│   ├── app.js                  # Szerver belépési pont
│   ├── config/database.js      # Adatbázis kapcsolat
│   ├── controllers/            # MVC kontrollerek
│   ├── models/                 # Sequelize modellek
│   ├── routes/                 # API végpontok
│   ├── services/dataSimulator  # EKG/életjel szimulációs logika
│   └── websocket/socketHandler # Socket.IO eseménykezelő
└── frontend/
    ├── index.html
    └── src/
        ├── main.js
        ├── style.css
        ├── components/         # Dashboard, VitalCard, EKG/HR/BP grafikonok
        ├── hooks/              # useVitalSigns (Socket.IO adatkezelés)
        └── services/socket.js  # Socket kapcsolat
```

# Telepítés és indítás

# Előfeltételek
- Node.js 18+
- MySQL (opcionális, SQLite is működik alapból)

# 1. Backend telepítése

```bash
cd backend
npm install
```

Hozzon létre egy `.env` fájlt a `backend/` mappában:

```env
PORT=3000
NODE_ENV=development
DB_DIALECT=sqlite
```

> MySQL használatához állítsa be: `DB_DIALECT=mysql`, `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

# 2. Frontend telepítése és build

```bash
cd frontend
npm install
npm run build
```

# 3. Indítás

```bash
cd backend
npm start 
VAGY
npm run dev
```

Az alkalmazás elérhető: (http://localhost:3000)


# Fejlesztői mód

Egy paranccsal elindítható a backend (nodemon) és a frontend (Vite dev szerver) egyszerre:

```bash
cd backend
npm run dev:student
```

Fejlesztői mód esetén a frontend a (http://localhost:5173) címen érhető el.

# Funkciók

- Valós idejű EKG-görbe megjelenítés
- Pulzus (HR) és vérnyomás (BP) élő grafikonok
- Kapcsolat állapot jelző 
- Grafikonok ki/be kapcsolható panellel
- Páciens azonosító megjelenítése

# API végpontok

| Metódus | Végpont | Leírás |
|---------|---------|--------|
| GET | `/health` | Szerver állapot |
| GET | `/api/patients` | Páciensek listája |
| GET | `/api/vitals` | Életjel adatok |

WebSocket esemény: `vitalSigns` – 1 másodpercenként érkezik az aktuális adat.

# Kihívások

- Valós idejű adatfolyam stabil kezelése: a frontend oldalon biztosítani kellett, hogy a folyamatosan érkező Socket.IO adatok ne okozzanak akadozást a grafikonoknál.

