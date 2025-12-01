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
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [detailsEvent, setDetailsEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // registrationData holds the form values shown in the dialog
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || null
  );
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Dummy login user (optional)
  const handleDummyLogin = () => {
    const user = {
      name: 'Test User',
      email: 'test@demo.com',
      phone: '9876543210',
    };

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setLoggedInUser(user);

    setSnackbar({ open: true, message: 'Logged in as Test User!' });
  };

  // Load events from localStorage
  useEffect(() => {
    const loadEvents = () => {
      const storedEvents = localStorage.getItem('ngoEvents');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        const dummyEvents = [
          {
            id: 'EVT-001',
            title: 'Coastal Cleanup & Marine Awareness Drive',
            date: '2026-01-18',
            time: '8:00 AM – 12:00 PM',
            location: 'Marina Beach, Chennai',
            maxParticipants: 120,
            participants: 0,
            organizer: 'BlueEarth Foundation',
            description:
              'Join our coastal conservation team for a half-day cleanup drive focusing on plastic removal and community engagement. Participants will also receive a short awareness session on marine pollution.',
            restrictions:
              'Participants must be 12+ years old. Bring sun protection and wear closed shoes.',
            skills: [
              'Hands-on experience in waste sorting & recycling',
              'Understanding of coastal ecosystems',
              'Team collaboration & environmental stewardship',
            ],
          },
          {
            id: 'EVT-002',
            title: 'Urban Tree Plantation & Green Maintenance Workshop',
            date: '2025-02-02',
            time: '7:30 AM – 10:30 AM',
            location: 'Nehru Park, Hyderabad',
            maxParticipants: 60,
            participants: 38,
            organizer: 'GreenCycle Initiative',
            description:
              'A guided plantation event where volunteers plant native saplings, learn maintenance techniques, and understand their role in urban biodiversity restoration.',
            restrictions:
              'Wear comfortable clothing. Not suitable for individuals with severe dust allergies.',
            skills: [
              'Planting and caring for native tree species',
              'Basics of urban biodiversity',
              'Sustainable gardening techniques',
            ],
          },
          {
            id: 'EVT-003',
            title: 'Community Lake Restoration & Water Testing Day',
            date: '2025-02-15',
            time: '9:00 AM – 1:00 PM',
            location: 'Kalyani Lake, Pune',
            maxParticipants: 80,
            participants: 70,
            organizer: 'EcoRevive NGO',
            description:
              'Support the restoration of an urban lake by participating in desilting assistance, invasive plant removal, and water-quality awareness activities.',
            restrictions:
              'Minors must be accompanied by adults. Waterproof footwear recommended.',
            skills: [
              'Water quality testing basics',
              'Wetland restoration practices',
              'Invasive species identification',
            ],
          },
          {
            id: 'EVT-004',
            title: 'E-Waste Collection & Recycling Education Drive',
            date: '2026-03-01',
            time: '10:00 AM – 4:00 PM',
            location: 'Digital Hub Community Center, Bengaluru',
            maxParticipants: 150,
            participants: 0,
            organizer: 'TechForEarth Alliance',
            description:
              'Help collect e-waste from households and participate in a workshop that explains responsible disposal, e-waste hazards, and recycling pathways.',
            restrictions:
              'No hazardous personal items. Ensure e-waste is safely packed before arrival.',
            skills: [
              'Understanding e-waste segregation',
              'Awareness of electronic recycling processes',
              'Public interaction & outreach experience',
            ],
          },
          {
            id: 'EVT-005',
            title: 'Forest Trail Cleanup & Wildlife Safety Orientation',
            date: '2025-03-10',
            time: '6:00 AM – 11:00 AM',
            location: 'Sanctuary Trail, Munnar',
            maxParticipants: 40,
            participants: 36,
            organizer: 'WildRoots Conservation Trust',
            description:
              'Participate in an eco-sensitive forest trail cleanup followed by a wildlife coexistence orientation conducted by certified naturalists.',
            restrictions:
              'Participants must be physically fit for moderate trekking. Strictly no loud music or food littering.',
            skills: [
              'Basics of wildlife safety and coexistence',
              'Trail conservation & low-impact hiking techniques',
              'Nature awareness and field discipline',
            ],
          },
        ];

        localStorage.setItem('ngoEvents', JSON.stringify(dummyEvents));
        setEvents(dummyEvents);
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

  // When opening the registration dialog, prefill the form from loggedInUser if available.
  const handleRegisterClick = (event) => {
    // Use state loggedInUser (not reading localStorage directly)
    if (!loggedInUser) {
      setSnackbar({ open: true, message: 'Please login first to register!' });
      return;
    }

    // Prefill registration form with logged in user's info so confirm button becomes enabled
    setRegistrationData({
      name: loggedInUser.name || '',
      email: loggedInUser.email || '',
      phone: loggedInUser.phone || '',
    });

    // Set the selected event and open dialog
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleRegister = () => {
    // Validate required fields (trimmed)
    const name = (registrationData.name || '').toString().trim();
    const email = (registrationData.email || '').toString().trim();

    if (!name || !email || !selectedEvent) {
      setSnackbar({ open: true, message: 'Please fill required fields.' });
      return;
    }

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
    const updatedEvents = events.map((ev) =>
      ev.id === selectedEvent.id
        ? { ...ev, participants: (ev.participants || 0) + 1 }
        : ev
    );
    setEvents(updatedEvents);
    localStorage.setItem('ngoEvents', JSON.stringify(updatedEvents));

    setSnackbar({ open: true, message: 'Successfully registered for the event!' });
    setOpenDialog(false);

    // Reset registrationData to empty object so next time we prefill again from loggedInUser
    setRegistrationData({ name: '', email: '', phone: '' });
    setSelectedEvent(null);
  };

  const isRegistered = (eventId) => {
    return registeredEvents.some((reg) => reg.eventId === eventId);
  };

  // Get today's date at midnight for proper comparison
  const getTodayStart = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  // Upcoming events: events from today onwards, sorted ascending
  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= getTodayStart();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Past events: events before today, sorted descending
  const pastEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < getTodayStart();
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filtered events: filter by selected date if date is chosen
  const filteredEvents = selectedDate
    ? upcomingEvents.filter((event) => event.date === selectedDate)
    : upcomingEvents;

  const myRegisteredEvents = upcomingEvents.filter((event) => isRegistered(event.id));

  const displayEvents =
    tabValue === 0 ? filteredEvents : tabValue === 1 ? myRegisteredEvents : pastEvents;

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
            background:
              'radial-gradient(circle at center, rgba(156,39,176,0.3), transparent 70%)',
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

      {/* Dummy login button */}
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        {!loggedInUser ? (
          <Button variant="contained" onClick={handleDummyLogin}>
            Login as Test User
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              // logout
              localStorage.removeItem('loggedInUser');
              localStorage.removeItem('registeredEvents'); // clear all registrations
              setRegisteredEvents([]);
              setLoggedInUser(null);
              setSnackbar({ open: true, message: 'Logged out' });
            }}
          >
            Logout ({loggedInUser.name})
          </Button>
        )}
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
                <Button variant="text" size="small" onClick={() => setSelectedDate('')}>
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
            {tabValue === 0 ? (selectedDate ? 'No events on this date' : 'No upcoming events') : tabValue === 1 ? 'No registered events' : 'No past events'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {tabValue === 0
              ? 'Check back soon for new environmental cleaning drives!'
              : tabValue === 1
              ? 'Register for an event to see it here'
              : "Past events will appear here once they're completed"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {displayEvents.map((event) => {
            const registered = isRegistered(event.id);
            const isFull = event.maxParticipants && event.participants >= parseInt(event.maxParticipants);

            return (
              <Grid item xs={12} sm={6} lg={4} key={event.id}>
                <Card
                  component={motion.div}
                  whileHover={{ y: -4 }}
                  sx={{
                    width: 340, // FIXED WIDTH
                    height: 420, // FIXED HEIGHT
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
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
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {event.description}
                        </Typography>
                      )}

                      <Box sx={{ flexGrow: 1 }} />

                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                          setDetailsEvent(event);
                          setDetailsDialogOpen(true);
                        }}
                      >
                        View Details
                      </Button>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <PeopleIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {event.participants || 0} / {event.maxParticipants || '∞'} participants
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        {tabValue === 2 ? (
                          <Chip label="Completed" color="default" size="small" />
                        ) : registered ? (
                          <Chip label="Registered" color="success" size="small" icon={<CheckIcon />} />
                        ) : isFull ? (
                          <Chip label="Full" color="error" size="small" />
                        ) : (
                          <Chip label="Available" color="primary" size="small" />
                        )}

                        {tabValue !== 2 && (
                          <Button
                            variant="contained"
                            size="small"
                            disabled={registered || isFull}
                            onClick={() => {
                              if (!loggedInUser) {
                                setSnackbar({ open: true, message: 'Please login to register.' });
                                return;
                              }
                              handleRegisterClick(event);
                            }}
                            sx={{ ml: 'auto' }}
                          >
                            {registered ? 'Registered' : isFull ? 'Full' : 'Register'}
                          </Button>
                        )}
                      </Stack>
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
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
              onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={registrationData.email}
              onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={registrationData.phone}
              onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
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

      {/* Event Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={() => setDetailsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{detailsEvent?.title}</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography variant="body1">
              <strong>Date:</strong>{' '}
              {detailsEvent &&
                new Date(detailsEvent.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </Typography>

            <Typography variant="body1">
              <strong>Time:</strong> {detailsEvent?.time || 'Not specified'}
            </Typography>

            <Typography variant="body1">
              <strong>Location:</strong> {detailsEvent?.location}
            </Typography>

            <Typography variant="body1">
              <strong>Organizer:</strong> {detailsEvent?.organizer || 'Not provided'}
            </Typography>

            <Typography variant="body1">
              <strong>Participants:</strong> {detailsEvent?.participants || 0} / {detailsEvent?.maxParticipants || '∞'}
            </Typography>

            {detailsEvent?.description && (
              <Typography variant="body1">
                <strong>Description:</strong> {detailsEvent.description}
              </Typography>
            )}

            {detailsEvent?.restrictions && (
              <Typography variant="body1" color="error">
                <strong>Restrictions:</strong> {detailsEvent.restrictions}
              </Typography>
            )}

            {detailsEvent?.skills && detailsEvent.skills.length > 0 && (
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  Skills / Experience Gained:
                </Typography>
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                  {detailsEvent.skills.map((skill, idx) => (
                    <li key={idx}>
                      <Typography variant="body2">{skill}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
    </Stack>
  );
}