import { socket } from './index';
import moment from 'moment';

export const socketEvents = ({ setState }) => {
  socket.on('setUser', ({ user }) => {
    setState(state => {
      return { ...state, user };
    });
  });

  socket.on('newChatMessage', messageObject => {
    setState(state => {
      return { ...state, messages: [...state.messages, messageObject] };
    });
  });

  socket.on('joinError', message => {
    setState(state => {
      return { ...state, joinError: { error: true, message } };
    });
  });

  socket.on('userDisconnected', message => {
    setState(state => {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            message,
            createdAt: moment().format('HH:mm:ss'),
            system: true
          }
        ]
      };
    });
  });

  socket.on('userIdle', message => {
    setState(state => {
      return {
        ...state,
        idle: true,
        messages: [
          ...state.messages,
          {
            message,
            createdAt: moment().format('HH:mm:ss'),
            system: true
          }
        ]
      };
    });
  });

  socket.on('disconnect', () => {
    setState(state => {
      return {
        ...state,
        disconnected: true,
        user: {
          username: '',
          avatar: ''
        },
        messages: []
      };
    });
  });
};
