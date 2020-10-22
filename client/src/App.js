import React, { useContext, useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { API, setToken } from './config/config';
import { Context } from './context/Context';

// component
import PrivateRoute from './components/Route/PrivateRoute';
import AdminRoute from './components/Route/AdminRoute';
import NavBar from './components/NavBar';
import UserNavBar from './components/UserNavBar';

// pages
import Landing from './pages/Landing';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyCollection from './pages/MyCollection';
import AddLiterature from './pages/AddLiterature';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Admin from './pages/Admin';

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await API.get('/validate');

        dispatch({
          type: 'GET_USER',
          payload: data.data,
        });
      } catch (error) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    };

    loadUser();
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path={[
            '/home',
            '/profile',
            '/my-collection',
            '/add-literature',
            '/detail',
            '/search',
          ]}
        >
          <Container>
            <UserNavBar />
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/my-collection"
                component={MyCollection}
              />
              <PrivateRoute
                exact
                path="/add-literature"
                component={AddLiterature}
              />
              <PrivateRoute exact path="/detail/:id" component={Detail} />
              <PrivateRoute exact path="/search" component={Search} />
            </Switch>
          </Container>
        </Route>
        <Route path={['/', '/admin']}>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Landing} />
            <AdminRoute exact path="/admin" component={Admin} />
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;