import { io } from 'socket.io-client';
const backendUrl = (import.meta.env && import.meta.env.VITE_BACKEND_URL)
  ? import.meta.env.VITE_BACKEND_URL
  : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : window.location.origin;

const socket = io(backendUrl, {
  transports: ['websocket'],
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

export default socket;
