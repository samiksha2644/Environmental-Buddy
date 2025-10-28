import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function NgoAdmin() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    maxParticipants: '',
  });

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('ngoEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('ngoEvents', JSON.stringify(events));
    }
  }, [events]);

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.location) {
      const event = {
        id: Date.now(),
        ...newEvent,
        participants: 0,
        createdAt: new Date().toISOString(),
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', location: '', description: '', maxParticipants: '' });
      setOpenDialog(false);
    }
  };

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    if (updatedEvents.length === 0) {
      localStorage.removeItem('ngoEvents');
    }
  };

  const filteredEvents = selectedDate
    ? events.filter((event) => event.date === selectedDate)
    : events;

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Stack spacing={6}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          p: { xs: 4, md: 8 },
          bgcolor: 'background.paper',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(46,125,50,0.3), transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <Typography variant="h2" fontWeight={800} gutterBottom>
          Participate in Environment Cleaning Drives
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth={640}>
          Join hands with NGOs and communities to make our planet cleaner and greener.
        </Typography>
        <Stack direction="row" spacing={2} mt={3}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Create Event
          </Button>
        </Stack>
      </Box>

      {/* Calendar and Filter Section */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Filter Events by Date
            </Typography>
            <TextField
              type="date"
              fullWidth
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              label="Select Date"
            />
            {selectedDate && (
              <Button
                variant="text"
                size="small"
                onClick={() => setSelectedDate('')}
              >
                Clear Filter
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Events Display */}
      {filteredEvents.length === 0 ? (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 8,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {selectedDate ? 'No events on this date' : 'No events scheduled yet'}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            {selectedDate
              ? 'Try selecting a different date or clear the filter.'
              : 'Create your first environmental cleaning drive to get started!'}
          </Typography>
          {!selectedDate && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Create First Event
            </Button>
          )}
        </Box>
      ) : (
        <>
          <Typography variant="h5" fontWeight={600}>
            {selectedDate ? `Events on ${new Date(selectedDate).toLocaleDateString()}` : 'All Events'}
          </Typography>
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} md={6} key={event.id}>
                <Card
                  component={motion.div}
                  whileHover={{ y: -4 }}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Typography variant="h6" fontWeight={600}>
                          {event.title}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <LocationIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Stack>

                      {event.description && (
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                      )}

                      <Stack direction="row" spacing={1} alignItems="center">
                        <PeopleIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {event.participants} / {event.maxParticipants || '∞'} participants
                        </Typography>
                      </Stack>

                      <Box>
                        {new Date(event.date) >= new Date() ? (
                          <Chip label="Upcoming" color="success" size="small" />
                        ) : (
                          <Chip label="Past Event" color="default" size="small" />
                        )}
                      </Box>

                      <Button variant="contained" fullWidth>
                        Register Now
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Upcoming Events Summary */}
      {upcomingEvents.length > 0 && !selectedDate && (
        <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
            Quick Stats
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography>Total Events: {events.length}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>Upcoming Events: {upcomingEvents.length}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>
                Total Participants: {events.reduce((sum, e) => sum + e.participants, 0)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Create Event Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Event Title"
              fullWidth
              required
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <TextField
              label="Location"
              fullWidth
              required
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <TextField
              label="Max Participants"
              type="number"
              fullWidth
              value={newEvent.maxParticipants}
              onChange={(e) => setNewEvent({ ...newEvent, maxParticipants: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddEvent}
            variant="contained"
            disabled={!newEvent.title || !newEvent.date || !newEvent.location}
          >
            Create Event
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}