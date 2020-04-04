import io from 'socket.io-client';
import { socketEvents } from './events';
import { backend } from '../../config';
// import { joinChat, sendMessage } from './emit';
export const socket = io(backend.endpoint);
export const initSockets = ({ setState }) => {
  socketEvents({ setState });
};
