import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Welcome from './components/Welcome/Welcome';
import Chat from './components/Chat/Chat';
import SocketContext from './context/sockets/SocketContext';
import SocketProvider from './context/sockets/SocketProvider';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const {
    state: {
      user: { nickname }
    }
  } = useContext(SocketContext);

  return (
    <Route
      {...rest}
      render={props =>
        !!nickname ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const routing = (
  <Router>
    <Route exact path="/" component={Welcome} />
    <PrivateRoute path="/chat" component={Chat} />
  </Router>
);

const App = () => <SocketProvider>{routing}</SocketProvider>;

export default App;
