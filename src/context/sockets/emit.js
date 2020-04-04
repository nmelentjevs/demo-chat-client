import { socket } from './index';

const joinChat = ({ nickname }) => {
  socket.emit('join', { nickname });
};

const sendMessage = ({ message, nickname }) => {
  socket.emit('newChatMessage', { message, nickname });
};

const startedTyping = () => {
  socket.emit('startedTyping');
};

const disconnect = () => {
  socket.disconnect();
};

export { joinChat, sendMessage, startedTyping, disconnect };
