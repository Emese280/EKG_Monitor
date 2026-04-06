const { generateVitalSigns } = require('../services/dataSimulator');
const VitalSign = require('../models/VitalSign');
const Patient = require('../models/Patient');

let broadcastInterval = null;
let saveCounter = 0;
const BROADCAST_MS = 1000;  // 1 mp-enkénti élő frissítés
const DB_SAVE_EVERY = 5;    // minden 5. lépésnél mentés az adatbázisba

function initSocketHandler(io) {
  io.on('connection', (socket) => {
    // Indítjuk az intervallumot ha még nem fut
    if (!broadcastInterval) {
      broadcastInterval = setInterval(async () => {
        const activePatient = await Patient.findOne({ where: { isActive: true } });
        const patientCode = activePatient ? activePatient.code : 'APL-001';
        const data = generateVitalSigns(patientCode);

        saveCounter++;
        if (saveCounter >= DB_SAVE_EVERY) {
          saveCounter = 0;
          VitalSign.create({
            patientId:   data.patientId,
            heartRate:   data.heartRate,
            systolic:    data.systolic,
            diastolic:   data.diastolic,
            spo2:        data.spo2,
            temperature: data.temperature,
            ecgSnapshot: data.ecgValues,
            timestamp:   data.timestamp,
          }).catch((err) => console.error('[DB] Mentési hiba:', err));
        }

        // Valós idejű broadcast minden csatlakozott kliensnek
        io.emit('vitalUpdate', data);
      }, BROADCAST_MS);
    }

    socket.on('disconnect', () => {
      const remaining = io.of('/').sockets.size;
      if (remaining === 0 && broadcastInterval) {
        clearInterval(broadcastInterval);
        broadcastInterval = null;
        saveCounter = 0;
      }
    });
  });
}

module.exports = { initSocketHandler };
