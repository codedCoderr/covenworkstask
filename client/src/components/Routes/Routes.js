import React from 'react';
import Navbar from '../Navbar/Navbar';
import Dashboard from '../../containers/Dashboard/Dashboard';
// import Footer from '../Footer/Footer';
import Login from '../../containers/Login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const Routes = () => {
  return (
    <div>
      <Router>
        <div className='d-flex flex-column parent'>
          <Navbar />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            {/* <Route component={NotFound} /> */}
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    </div>
  );
};
export default Routes;
