// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
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
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
    },
    secondary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700],
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
