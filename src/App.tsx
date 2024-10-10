import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import theme from './styles/theme/theme';
import GlobalStyle from './styles/global/GlobalStyle';
import store from './store/store';
import Modal from './components/modal/Modal';

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppRouter />
          <Modal />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
