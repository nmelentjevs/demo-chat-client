import React, { useState, useContext } from 'react';
import { Button, CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { joinChat } from '../../../context/sockets/emit';
import SocketContext from '../../../context/sockets/SocketContext';
import backend from '../../../api/backend';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import './nickname-box.scss';

const NicknameBox = () => {
  let history = useHistory();
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);

  const { state, setState } = useContext(SocketContext);
  const { joinError } = state;

  const handleJoin = async e => {
    e.preventDefault();
    setLoading(true);
    setState({
      ...state,
      joinError: { error: false, message: '' }
    });
    if (!nickname) {
      setLoading(false);
      setInputError(true);
    } else {
      joinChat({ nickname });
      await backend
        .get('/ping')
        .then(_ => {
          setLoading(false);
          if (!joinError.error) {
            history.push('/chat');
          }
        })
        .catch(_ => {
          setLoading(false);
          setState({
            ...state,
            joinError: { error: true, message: 'Server unavailable' },
            disconnected: true
          });
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="icon">
          <div className="icon__circle">
            <VpnKeyIcon className="icon__icon" />
          </div>
        </div>
        <div className="join">
          <div className="join__box">
            <input
              className="join__input"
              value={nickname}
              placeholder="Nickname"
              onChange={e => {
                setNickname(e.target.value);
                setInputError(false);
                setState({
                  ...state,
                  joinError: { error: false, message: '' }
                });
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleJoin(e);
                }
              }}
            />
          </div>
          <>
            <Button
              class="join__button"
              variant="contained"
              onClick={handleJoin}
            >
              {loading ? (
                <CircularProgress color="secondary" size={12} />
              ) : (
                'Join'
              )}
            </Button>
            <Snackbar
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={inputError || joinError.error}
              message="I love snacks"
            >
              {inputError ? (
                <Alert severity="warning">Please provide a nickname</Alert>
              ) : (
                <Alert severity="error">{joinError.message}</Alert>
              )}
            </Snackbar>
          </>
        </div>
      </div>
    </>
  );
};

export default NicknameBox;
