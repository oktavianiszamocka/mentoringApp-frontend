import './index.css';
import React, { Suspense } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { Provider, history } from './utils/storage/store';
import { routes } from './utils/helpers/routing';

// import Admin from './Admin/routes';
import Login from './Auth/Login';
import UpsertPassword from './Auth/UpsertPassword';

const renderRoute = route => <Route key={route.path} {...route} />;

const App = () => {
  return (
    <Provider>
       <Router history={history}>
          <Suspense fallback="loading">
            <Route path="/" exact render={() => <Redirect to="/login" />} />
            <Route path="/login" component={Login} />
            <Route path={["/reset-password", "/register"]} component={UpsertPassword} />
            {/* <Route path="/admin" component={Admin} /> */}
            {/* {routes.map(renderRoute)} */}
          </Suspense>
        </Router>
    </Provider>
  );
};

export default App;
