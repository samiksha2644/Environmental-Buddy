import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useEffect, useMemo, useState } from 'react';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

function getDesignTokens(mode) {
  return {
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#2e7d32' : '#81c784' },
      secondary: { main: mode === 'light' ? '#0277bd' : '#4fc3f7' },
      background: {
        default: mode === 'light' ? '#f3f7f4' : '#0b0f0c',
        paper: mode === 'light' ? '#ffffff' : '#121a14',
      },
    },
    typography: { fontFamily: 'Inter, Roboto, system-ui, Arial, sans-serif' },
    shape: { borderRadius: 12 },
    components: { MuiButton: { defaultProps: { disableElevation: true } } },
  };
}

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const stored = window.localStorage.getItem('color-mode');
    if (stored === 'light' || stored === 'dark') setMode(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('color-mode', mode);
    const root = document.documentElement;
    if (mode === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  }, [mode]);

  const colorMode = useMemo(() => ({
    mode,
    toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
  }), [mode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}