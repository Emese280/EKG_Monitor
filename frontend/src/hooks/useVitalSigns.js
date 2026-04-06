import { useState, useEffect } from 'react';
import socket from '../services/socket';

const MAX_HISTORY = 60;

export function useVitalSigns() {
  const [connected, setConnected]           = useState(false);
  const [latest, setLatest]                 = useState(null);
  const [heartRateHistory, setHRHistory]    = useState([]);
  const [bpHistory, setBPHistory]           = useState([]);
  const [ecgBuffer, setEcgBuffer]           = useState([]);
  const [timeLabels, setTimeLabels]         = useState([]);

  useEffect(() => {
    const onConnect    = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    const onVitalUpdate = (data) => {
      setLatest(data);

      const label = new Date(data.timestamp).toLocaleTimeString('hu-HU');

      setTimeLabels((prev) => {
        const next = [...prev, label];
        return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
      });

      setHRHistory((prev) => {
        const next = [...prev, data.heartRate];
        return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
      });

      setBPHistory((prev) => {
        const next = [...prev, { systolic: data.systolic, diastolic: data.diastolic }];
        return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
      });

      setEcgBuffer(data.ecgValues || []);
    };

    socket.on('connect',      onConnect);
    socket.on('disconnect',   onDisconnect);
    socket.on('vitalUpdate',  onVitalUpdate);

    return () => {
      socket.off('connect',     onConnect);
      socket.off('disconnect',  onDisconnect);
      socket.off('vitalUpdate', onVitalUpdate);
    };
  }, []);

  return { connected, latest, heartRateHistory, bpHistory, ecgBuffer, timeLabels };
}
