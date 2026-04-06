import React, { useState } from 'react';
import { useVitalSigns } from '../hooks/useVitalSigns';
import VitalCard from './VitalCard';
import HeartRateChart from './HeartRateChart';
import BloodPressureChart from './BloodPressureChart';
import ECGChart from './ECGChart';

function getHRStatus(hr) {
  if (!hr) return 'normal';
  if (hr > 100 || hr < 55) return 'warning';
  return 'normal';
}

function getSPO2Status(spo2) {
  if (!spo2) return 'normal';
  if (spo2 < 95) return 'critical';
  if (spo2 < 97) return 'warning';
  return 'normal';
}

function Dashboard() {
  const [showBottomSection, setShowBottomSection] = useState(true);
  const { connected, latest, heartRateHistory, bpHistory, ecgBuffer, timeLabels } =
    useVitalSigns();

  return React.createElement(
    'div',
    { className: 'dashboard' },

    // Fejléc
    React.createElement(
      'header',
      { className: 'dashboard__header' },
      React.createElement(
        'div',
        { className: 'dashboard__header-left' },
        React.createElement('span', { className: 'dashboard__subtitle' }, 'Életjelek')
      ),
      React.createElement(
        'div',
        { className: 'dashboard__header-right' },
        React.createElement(
          'span',
          { className: 'dashboard__patient' },
          'Páciens: ',
          React.createElement('strong', null, latest ? latest.patientId : '—')
        ),
        React.createElement(
          'span',
          { className: 'dashboard__status ' + (connected ? 'dashboard__status--live' : 'dashboard__status--offline') },
          React.createElement('span', { className: 'dashboard__status-dot' }),
          connected ? 'ÉLŐ ADATFOLYAM' : 'KAPCSOLÓDÁS...'
        )
      )
    ),

    // KPI kártyák
    React.createElement(
      'div',
      { className: 'vital-cards' },
      React.createElement(VitalCard, {
        label: 'Pulzus',
        value: latest ? latest.heartRate : '—',
        unit: 'bpm',
        color: '#ef4444',
        status: getHRStatus(latest ? latest.heartRate : null),
      }),
      React.createElement(VitalCard, {
        label: 'Vérnyomás',
        value: latest ? latest.systolic + '/' + latest.diastolic : '—',
        unit: 'mmHg',
        color: '#f97316',
        status: 'normal',
      }),
      React.createElement(VitalCard, {
        label: 'SpO₂',
        value: latest ? latest.spo2 : '—',
        unit: '%',
        color: '#3b82f6',
        status: getSPO2Status(latest ? latest.spo2 : null),
      }),
      React.createElement(VitalCard, {
        label: 'Hőmérséklet',
        value: latest ? latest.temperature : '—',
        unit: '°C',
        color: '#a855f7',
        status: latest && latest.temperature > 37.5 ? 'warning' : 'normal',
      })
    ),

    // EKG görbe
    React.createElement(ECGChart, { ecgBuffer }),

    React.createElement(
      'div',
      { className: 'dashboard__controls' },
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'dashboard__toggle-btn',
          onClick: () => setShowBottomSection((prev) => !prev),
        },
        showBottomSection ? 'Alsó rész elrejtése' : 'Alsó rész megjelenítése'
      )
    ),

    // Trend grafikonok
    showBottomSection
      ? React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'div',
            { className: 'charts-row' },
            React.createElement(HeartRateChart, { timeLabels, data: heartRateHistory }),
            React.createElement(BloodPressureChart, { timeLabels, bpHistory })
          )
        )
      : null
  );
}

export default Dashboard;
