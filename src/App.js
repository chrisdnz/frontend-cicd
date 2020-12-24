import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { SignIn } from './Components/SigninForm';
import { UsersList } from './Components/UsersList';

import { AuthContext, ProviderAuth } from './providers/authProvider';

const PrivateRoute = ({ children, ...rest }) => {
  let auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    ></Route>
  );
};

function App() {
  return (
    <ProviderAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <SignIn />
          </Route>
          <PrivateRoute path="/">
            <UsersList />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProviderAuth>
  );
}

export default App;
