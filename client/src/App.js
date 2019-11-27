import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import Alert from './components/Alert/Alert';
import Routes from './components/Routes/Routes';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='d-flex flex-column parent'>
          <div className=''>
            <Alert />
            <Switch>
              <PersistGate loading={null} persistor={persistor}>
                <Routes />
              </PersistGate>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};
export default App;
