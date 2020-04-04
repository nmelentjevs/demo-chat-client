import React, { useState, useEffect } from 'react';
import SocketContext from './SocketContext';
import { initSockets } from './index';

const SocketProvider = props => {
  const [state, setState] = useState({
    user: { nickname: '', avatar: '' },
    messages: [],
    joinError: {
      error: false,
      message: ''
    },
    idle: false,
    disconnected: false
  });
  useEffect(() => {
    initSockets({ setState });
  }, []);

  return (
    <SocketContext.Provider value={{ state, setState }}>
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
