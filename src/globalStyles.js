// @flow
import robotoNormal300 from './assets/fonts/roboto-normal-300.woff2';
import robotoNormal400 from './assets/fonts/roboto-normal-400.woff2';
import robotoNormal500 from './assets/fonts/roboto-normal-500.woff2';
import materialIcons from './assets/fonts/material-icons.woff2';

const styles = {
  '@global': {
    '@font-face': [
      {
        fontFamily: '\'Roboto\'',
        src: `url(${robotoNormal300})`,
        fontWeight: 300,
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: '\'Roboto\'',
        src: `url(${robotoNormal400})`,
        fontWeight: 400,
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: '\'Roboto\'',
        src: `url(${robotoNormal500})`,
        fontWeight: 500,
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: '\'Material Icons\'',
        src: `url(${materialIcons})`,
        fontWeight: 400,
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
    ],
    html: {
      padding: 0,
      margin: 0,
      '-webkit-font-smoothing': 'antialiased',
    },
    body: {
      margin: 0,
      padding: 0,
      fontFamily: '\'Roboto\', sans-serif !important',
    },
    ':focus': {
      outline: 0,
    },
    'button, a, input, textarea, select': {
      '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
    },
    a: {
      textDecoration: 'none',
    },
    h1: {
      fontSize: 28,
      fontFamily: '\'Roboto\', sans-serif !important',
    },
    h2: {
      fontSize: 21,
      fontFamily: '\'Roboto\', sans-serif !important',
    },
    h3: {
      fontSize: 18,
      fontFamily: '\'Roboto\', sans-serif !important',
    },
    h4: {
      fontSize: 14,
      fontFamily: '\'Roboto\', sans-serif !important',
    },
    '.material-icons': {
      fontFamily: 'Material Icons',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontSize: 24,
      lineHeight: 1,
      letterSpacing: 'normal',
      textTransform: 'none',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      direction: 'ltr',
      '-webkit-font-feature-settings': 'liga',
      '-webkit-font-smoothing': 'antialiased',
    },
    '.heading': {
      letterSpacing: '-0.01em',
      lineHeight: 1.45,
      color: '#171717',
      marginTop: 0,
      paddingTop: 0,
    },
    figure: {
      margin: [[30, 0]],
      '& img': {
        width: '100vw',
        maxWidth: '100vw',
        marginLeft: -18,
        height: 'auto',
        '@media (min-width: 860px)': {
          width: '100%',
          maxWidth: '100%',
          marginLeft: 0,
          height: 'auto',
        },
      },
    },
    figcaption: {
      color: '#707070',
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 1.35,
    },
    '.placeholder': {
      backgroundColor: '#eeeeee',
      height: 10,
      marginBottom: 10,
      '@media (min-width: 860px)': {
        height: 15,
        marginBottom: 15,
      },
    },
    '.invisibleLinkText': {
      lineHeight: 0,
      fontSize: 0,
      color: 'transparent',
    },
  },
};

export default styles;
