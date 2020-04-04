import { createContext } from 'react';
const SocketContext = createContext({
  user: { nickname: '', avatar: '' },
  messages: [],
  joinError: {
    error: false,
    message: ''
  },
  idle: false,
  disconnected: false
});
export default SocketContext;
