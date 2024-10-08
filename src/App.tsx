import { ThemeProvider } from 'styled-components';
import AppRouter from './routes/AppRouter';
import theme from './styles/theme/theme';
import GlobalStyle from './styles/global/GlobalStyle';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
