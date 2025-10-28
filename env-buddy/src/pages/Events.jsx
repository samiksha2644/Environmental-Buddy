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
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  People as PeopleIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Load events from localStorage
  useEffect(() => {
    const loadEvents = () => {
      const storedEvents = localStorage.getItem('ngoEvents');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    };

    loadEvents();

    // Poll for updates every 2 seconds to simulate real-time updates
    const interval = setInterval(loadEvents, 2000);
    return () => clearInterval(interval);
  }, []);

  // Load registered events from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('registeredEvents');
    if (stored) {
      setRegisteredEvents(JSON.parse(stored));
    }
  }, []);

  const handleRegister = () => {
    if (registrationData.name && registrationData.email) {
      // Add registration
      const registration = {
        eventId: selectedEvent.id,
        ...registrationData,
        registeredAt: new Date().toISOString(),
      };

      const newRegistrations = [...registeredEvents, registration];
      setRegisteredEvents(newRegistrations);
      localStorage.setItem('registeredEvents', JSON.stringify(newRegistrations));

      // Update participant count in events
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, participants: (event.participants || 0) + 1 }
          : event
      );
      setEvents(updatedEvents);
      localStorage.setItem('ngoEvents', JSON.stringify(updatedEvents));

      setSnackbar({ open: true, message: 'Successfully registered for the event!' });
      setOpenDialog(false);
      setRegistrationData({ name: '', email: '', phone: '' });
      setSelectedEvent(null);
    }
  };

  const isRegistered = (eventId) => {
    return registeredEvents.some((reg) => reg.eventId === eventId);
  };

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastEvents = events
    .filter((event) => new Date(event.date) < new Date())
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredEvents = selectedDate
    ? upcomingEvents.filter((event) => event.date === selectedDate)
    : upcomingEvents;

  const myRegisteredEvents = upcomingEvents.filter((event) =>
    isRegistered(event.id)
  );

  const displayEvents = tabValue === 0 ? filteredEvents : tabValue === 1 ? myRegisteredEvents : pastEvents;

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
            background: 'radial-gradient(circle at center, rgba(156,39,176,0.3), transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <Typography variant="h2" fontWeight={800} gutterBottom>
          Environmental Events
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth={640}>
          Join community-driven cleaning drives and make a real impact on our environment.
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Upcoming Events" />
          <Tab label={`My Registrations (${myRegisteredEvents.length})`} />
          <Tab label="Past Events" />
        </Tabs>
      </Box>

      {/* Date Filter - Only show for upcoming events tab */}
      {tabValue === 0 && (
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={600}>
                Filter by Date
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
      )}

      {/* Events Display */}
      {displayEvents.length === 0 ? (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 8,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {tabValue === 0
              ? selectedDate
                ? 'No events on this date'
                : 'No upcoming events'
              : tabValue === 1
              ? 'No registered events'
              : 'No past events'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {tabValue === 0
              ? 'Check back soon for new environmental cleaning drives!'
              : tabValue === 1
              ? 'Register for an event to see it here'
              : 'Past events will appear here once they\'re completed'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {displayEvents.map((event) => {
            const registered = isRegistered(event.id);
            const isFull =
              event.maxParticipants &&
              event.participants >= parseInt(event.maxParticipants);

            return (
              <Grid item xs={12} md={6} key={event.id}>
                <Card
                  component={motion.div}
                  whileHover={{ y: -4 }}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6" fontWeight={600}>
                        {event.title}
                      </Typography>

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
                          {event.participants || 0} /{' '}
                          {event.maxParticipants || '∞'} participants
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {tabValue === 2 ? (
                          <Chip label="Completed" color="default" size="small" />
                        ) : registered ? (
                          <Chip
                            label="Registered"
                            color="success"
                            size="small"
                            icon={<CheckIcon />}
                          />
                        ) : isFull ? (
                          <Chip label="Full" color="error" size="small" />
                        ) : (
                          <Chip label="Available" color="primary" size="small" />
                        )}
                      </Stack>

                      {tabValue !== 2 && (
                        <Button
                          variant="contained"
                          fullWidth
                          disabled={registered || isFull}
                          onClick={() => {
                            setSelectedEvent(event);
                            setOpenDialog(true);
                          }}
                        >
                          {registered
                            ? 'Already Registered'
                            : isFull
                            ? 'Event Full'
                            : 'Register Now'}
                        </Button>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Quick Stats */}
      {tabValue === 0 && upcomingEvents.length > 0 && (
        <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
            Quick Stats
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography>Upcoming Events: {upcomingEvents.length}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>Your Registrations: {myRegisteredEvents.length}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>Total Events: {events.length}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Registration Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Alert severity="info">
              You're registering for the event on{' '}
              {selectedEvent &&
                new Date(selectedEvent.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </Alert>
            <TextField
              label="Full Name"
              fullWidth
              required
              value={registrationData.name}
              onChange={(e) =>
                setRegistrationData({ ...registrationData, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={registrationData.email}
              onChange={(e) =>
                setRegistrationData({ ...registrationData, email: e.target.value })
              }
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={registrationData.phone}
              onChange={(e) =>
                setRegistrationData({ ...registrationData, phone: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleRegister}
            variant="contained"
            disabled={!registrationData.name || !registrationData.email}
          >
            Confirm Registration
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Stack>
  );
}