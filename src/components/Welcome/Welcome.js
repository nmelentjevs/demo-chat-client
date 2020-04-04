import React, { useState, useEffect, useContext } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import NicknameBox from './NicknameBox/NicknameBox';
import SocketContext from '../../context/sockets/SocketContext';
import { socket } from '../../context/sockets/index';

const Welcome = () => {
  const { state, setState } = useContext(SocketContext);

  const [openIdle, setOpenIdle] = useState(state.idle);
  const [openDisconnect, setOpenDisconnect] = useState(state.disconnected);

  useEffect(() => {
    if (state.idle || state.disconnected) {
      window.addEventListener('keydown', disconnectHandler, false);
      function disconnectHandler() {
        this.removeEventListener('keydown', disconnectHandler, false);

        setState(state => {
          setState({ ...state, idle: false, disconnected: false });
        });
        socket.connect();
      }
    }
  }, [setState, state.idle, state.disconnected]);

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ width: '100vw', height: '100vh' }}
      >
        <NicknameBox />
      </Grid>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openIdle}
        onClose={() => setOpenIdle(false)}
      >
        <Alert severity="error">
          You have been disconnected due to innactivity
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openDisconnect && !openIdle}
        onClose={() => setOpenDisconnect(false)}
      >
        <Alert severity="error">You left the chat, connection lost</Alert>
      </Snackbar>
    </>
  );
};

export default Welcome;
