import { Backdrop, Box, Button, Modal, Stack, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ForestIcon from '@mui/icons-material/Forest';
import { motion } from 'framer-motion';

export default function KidsPopup({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} slots={{ backdrop: Backdrop }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        sx={{
          position: 'fixed', inset: 0, display: 'grid', placeItems: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Stack alignItems="center" spacing={3}>
          <Stack direction="row" spacing={2}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <WbSunnyIcon color="warning" sx={{ fontSize: 48 }} />
            </motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}>
              <RecyclingIcon color="success" sx={{ fontSize: 56 }} />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <AutoAwesomeIcon color="secondary" sx={{ fontSize: 48 }} />
            </motion.div>
          </Stack>

          <Typography variant="h4" textAlign="center" fontWeight={800}>
            Let's save the planet while we load!
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={520}>
            Plant trees, recycle, and learn fun eco facts. Your eco-journey starts now.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button onClick={onClose} variant="contained" size="large" startIcon={<ForestIcon />}>Start Exploring</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}