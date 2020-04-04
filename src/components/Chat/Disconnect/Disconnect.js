import React from 'react';
import { disconnect } from '../../../context/sockets/emit';
import { Button } from '@material-ui/core';

const Disconnect = () => {
  return <Button onClick={() => disconnect()}>Disconnect</Button>;
};

export default Disconnect;
