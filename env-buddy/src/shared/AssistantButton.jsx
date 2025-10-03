import { Avatar, Fab, Tooltip } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { motion } from 'framer-motion';

export default function AssistantButton() {
  return (
    <Tooltip title="Ask our AI buddy!" placement="left">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1200 }}
      >
        <Fab color="secondary" aria-label="assistant">
          <Avatar sx={{ bgcolor: 'transparent' }}>
            <SmartToyIcon />
          </Avatar>
        </Fab>
      </motion.div>
    </Tooltip>
  );
}