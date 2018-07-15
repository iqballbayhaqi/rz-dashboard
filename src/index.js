// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
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
