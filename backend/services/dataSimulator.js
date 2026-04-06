// Szimulált EKG és élettani adatok generátora

// Gauss-görbe segédfüggvény
function gauss(t, mu, sigma, amp) {
  return amp * Math.exp(-0.5 * Math.pow((t - mu) / sigma, 2));
}

// Egyetlen EKG-minta generálása (t ∈ [0,1] = egy szívciklus)
function ecgSample(t) {
  const tMod = ((t % 1) + 1) % 1;
  return (
    gauss(tMod, 0.10, 0.025, 0.20) +   // P hullám
    gauss(tMod, 0.28, 0.008, -0.20) +  // Q hullám
    gauss(tMod, 0.32, 0.010, 1.60) +   // R csúcs
    gauss(tMod, 0.36, 0.008, -0.35) +  // S hullám
    gauss(tMod, 0.55, 0.045, 0.32) +   // T hullám
    (Math.random() - 0.5) * 0.018       // zajszint
  );
}

// 3 szívciklust generálunk 150 mintaponttal
function generateECGWaveform(phase = 0) {
  const POINTS = 150;
  const CYCLES = 3;
  const result = [];
  for (let i = 0; i < POINTS; i++) {
    result.push(ecgSample((i / POINTS) * CYCLES + phase));
  }
  return result;
}

// Élettani szimulációs állapot (kis drift + zaj = realisztikus)
let hrBase = 72;
let sysBase = 120;
let diasBase = 80;
let spo2Base = 98;
let tempBase = 36.8;
let ecgPhase = 0;

function drift(value, noise, min, max) {
  const next = value + (Math.random() - 0.5) * noise;
  return Math.min(max, Math.max(min, next));
}

function generateVitalSigns(patientCode = 'APL-001') {
  hrBase   = drift(hrBase,   2.0, 52, 108);
  sysBase  = drift(sysBase,  1.5, 98, 142);
  diasBase = drift(diasBase, 1.0, 60, 92);
  spo2Base = drift(spo2Base, 0.3, 93, 100);
  tempBase = drift(tempBase, 0.05, 36.0, 38.2);
  ecgPhase += 0.2;

  return {
    patientId:   patientCode,
    heartRate:   Math.round(hrBase   * 10) / 10,
    systolic:    Math.round(sysBase  * 10) / 10,
    diastolic:   Math.round(diasBase * 10) / 10,
    spo2:        Math.round(spo2Base * 10) / 10,
    temperature: Math.round(tempBase * 10) / 10,
    ecgValues:   generateECGWaveform(ecgPhase),
    timestamp:   new Date(),
  };
}

module.exports = { generateVitalSigns };
