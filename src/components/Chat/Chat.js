import React, { useContext } from 'react';
import MessageBox from './MessageBox/MessageBox';
import Messages from './Messages/Messages';
import Search from './Search/Search';
import Disconnect from './Disconnect/Disconnect';
import { sendMessage } from '../../context/sockets/emit';
import SocketContext from '../../context/sockets/SocketContext';
import { Grid, Fade } from '@material-ui/core';

const Chat = () => {
  const {
    state: { messages, user }
  } = useContext(SocketContext);

  return (
    <Fade in>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ width: '100vw', height: '100vh' }}
      >
        <div className="container">
          <Grid item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Search messages={messages} /> <Disconnect />
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                minWidth: '50vw',
                maxWidth: '80vw',
                height: '80vh',
                position: 'relative'
              }}
            >
              <Messages messages={messages} currentUser={user} />
              <MessageBox onSendMessage={sendMessage} />
            </div>
          </Grid>
        </div>
      </Grid>
    </Fade>
  );
};

export default Chat;
