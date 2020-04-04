import React, { useState, useContext } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import SocketContext from '../../../context/sockets/SocketContext';
import { startedTyping } from '../../../context/sockets/emit';

const MessageBox = ({ onSendMessage: pushSendMessage }) => {
  const [message, setMesage] = useState('');
  const {
    state: {
      user: { nickname }
    }
  } = useContext(SocketContext);

  const handleSendMessage = () => {
    if (message) {
      pushSendMessage({ message, nickname });
      setMesage('');
    }
  };

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={10} md={11}>
          <div className="message">
            <div className="message__group">
              <input
                placeholder="Enter your message"
                className="message__control"
                value={message}
                onChange={e => setMesage(e.target.value)}
                onKeyDown={e => {
                  startedTyping();
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={2} md={1}>
          <IconButton onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default MessageBox;
