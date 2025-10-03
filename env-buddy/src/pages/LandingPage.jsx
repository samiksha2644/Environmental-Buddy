import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import WbSunny from '@mui/icons-material/WbSunny';
import Forest from '@mui/icons-material/Forest';
import Water from '@mui/icons-material/Water';
import Nature from '@mui/icons-material/Nature';
import Recycling from '@mui/icons-material/Recycling';
import Public from '@mui/icons-material/Public';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Close from '@mui/icons-material/Close';

const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
  <motion.div
    initial={{ y: 0, rotate: 0 }}
    animate={{ 
      y: [-10, 10, -10], 
      rotate: [-5, 5, -5] 
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    style={{ position: 'absolute' }}
  >
    {children}
  </motion.div>
);

const Particle = ({ delay, duration, size = 20, color = '#4caf50' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0], 
      scale: [0, 1, 0],
      y: [-100, 100],
      x: [-50, 50]
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity,
      ease: "easeOut"
    }}
    style={{
      position: 'absolute',
      width: size,  
      height: size,
      background: color,
      borderRadius: '50%',
      filter: 'blur(1px)'
    }}
  />
);

import { useNavigate } from 'react-router-dom';

export default function LandingPage({ onStart }) {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "🌱 Growing a greener future together",
    "🌍 Protecting our planet, one action at a time", 
    "♻️ Turning waste into wonder",
    "🌿 Learning to love our Earth",
    "💚 Building sustainable communities"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showContent) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showContent, messages.length]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #4caf50 50%, #81c784 75%, #a5d6a7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 9999
      }}
    >
      {/* Animated Background Elements */}
      <FloatingElement delay={0} duration={4}>
        <WbSunny sx={{ fontSize: 80, color: '#ffeb3b', opacity: 0.8 }} />
      </FloatingElement>
      
      <FloatingElement delay={1} duration={3}>
        <Forest sx={{ fontSize: 60, color: '#4caf50', opacity: 0.7 }} />
      </FloatingElement>
      
      <FloatingElement delay={2} duration={5}>
        <Water sx={{ fontSize: 70, color: '#2196f3', opacity: 0.6 }} />
      </FloatingElement>
      
      <FloatingElement delay={0.5} duration={4}>
        <Nature sx={{ fontSize: 50, color: '#8bc34a', opacity: 0.8 }} />
      </FloatingElement>
      
      <FloatingElement delay={1.5} duration={3.5}>
        <Recycling sx={{ fontSize: 65, color: '#ff9800', opacity: 0.7 }} />
      </FloatingElement>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <Particle
          key={i}
          delay={i * 0.3}
          duration={3 + Math.random() * 2}
          size={10 + Math.random() * 20}
          color={['#4caf50', '#2196f3', '#ffeb3b', '#ff9800', '#e91e63'][Math.floor(Math.random() * 5)]}
        />
      ))}

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              textAlign: 'center',
              zIndex: 10,
              position: 'relative'
            }}
          >
            {/* Main Logo/Icon */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ marginBottom: '2rem' }}
            >
              <Public sx={{ fontSize: 120, color: '#fff', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' }} />
              </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Typography 
                variant="h1" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 900, 
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  textShadow: '0 0 30px rgba(255,255,255,0.8)',
                  mb: 2
                }}
              >
                Environmental Buddy
              </Typography>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontWeight: 300,
                  mb: 4,
                  fontSize: { xs: '1.2rem', md: '1.8rem' }
                }}
              >
                Your Journey to Environmental Literacy Starts Here
              </Typography>
            </motion.div>

            {/* Rotating Messages */}
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '3rem' }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  fontWeight: 500,
                  fontSize: { xs: '1rem', md: '1.3rem' }
                }}
              >
                {messages[currentMessage]}
              </Typography>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => (onStart ? onStart() : navigate('/home'))}
                    startIcon={<PlayArrow />}
                    sx={{
                      background: 'linear-gradient(45deg, #4caf50, #81c784)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(76, 175, 80, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #388e3c, #66bb6a)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(76, 175, 80, 0.6)'
                      }
                    }}
                  >
                    Start Your Journey
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<AutoAwesome />}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              style={{ marginTop: '3rem' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ display: 'inline-block' }}
              >
                <AutoAwesome sx={{ fontSize: 40, color: 'rgba(255,255,255,0.7)' }} />
              </motion.div>
            </motion.div>

            {/* Skip Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              style={{ position: 'absolute', top: 20, right: 20 }}
            >
              <IconButton
                onClick={() => (onStart ? onStart() : navigate('/home'))}
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { color: 'white', background: 'rgba(255,255,255,0.1)' }
                }}
              >
                <Close />
              </IconButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}