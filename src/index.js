import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import 'babel-polyfill';
import App from './App';

import ScrollToTop from './ScrollToTop';

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.css';

// Material UI Pickers
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

let theme = createMuiTheme({
  typography: {
    fontSize: 16,
    fontFamily: 'Exo2-Medium'
  }
});

ReactDOM.render(
  <HashRouter>
    <ScrollToTop>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </ScrollToTop>
  </HashRouter>,
  document.getElementById('root')
);
