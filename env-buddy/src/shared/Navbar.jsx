import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../theme.jsx';

const navItems = [
  { label: 'Quiz', to: '/learning' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Events', to: '/events' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Info Hub', to: '/info' },
  { label: 'Login', to: '/signin' },
];

export default function Navbar() {
  const colorMode = useContext(ColorModeContext);
  const isDark = colorMode.mode === 'dark';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)' }}>
      <Toolbar sx={{ gap: 2 }}>
        <IconButton component={RouterLink} to="/" size="large" edge="start" color="primary">
          <ForestIcon />
        </IconButton>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}>
          Environmental Buddy
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navItems.map((item) => (
            <Button key={item.to} component={RouterLink} to={item.to} color="inherit" sx={{ textTransform: 'none' }}>
              {item.label}
            </Button>
          ))}
        </Box>

        <IconButton onClick={colorMode.toggleColorMode} color="inherit" aria-label="toggle theme">
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <IconButton onClick={() => setMobileOpen((v) => !v)} sx={{ display: { xs: 'inline-flex', md: 'none' } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}