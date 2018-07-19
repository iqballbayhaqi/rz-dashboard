// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#00abb7',
      main: '#008087',
      dark: '#006368',
    },
    secondary: {
      light: deepOrange[500],
      main: deepOrange[700],
      dark: deepOrange[900],
    },
  },
});

const initialState = {};
const store = configureStore(initialState);

const rootElement = document.getElementById('root');
const ReactApp = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </MuiThemeProvider>
);

if (rootElement == null) {
  throw new Error('no rootElement');
} else {
  ReactDOM.render(<ReactApp />, rootElement);
}

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <ReactApp />,
      rootElement,
    );
  });
}

registerServiceWorker();
