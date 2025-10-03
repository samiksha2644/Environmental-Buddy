import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import AssistantButton from '../shared/AssistantButton';
import KidsPopup from '../shared/KidsPopup';
import { useState } from 'react';

export default function MainLayout() {
  const [showKidsPopup, setShowKidsPopup] = useState(true);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
      <AssistantButton />
      <KidsPopup open={showKidsPopup} onClose={() => setShowKidsPopup(false)} />
    </Box>
  );
}