import { Box, Button, Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import QuizIcon from '@mui/icons-material/Quiz';
import EventIcon from '@mui/icons-material/Event';
import InsightsIcon from '@mui/icons-material/Insights';
import InfoIcon from '@mui/icons-material/Info';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const cards = [
  { title: 'Quiz & Learning', to: '/learning', icon: <QuizIcon color="primary" /> },
  { title: 'Tasks', to: '/tasks', icon: <LeaderboardIcon color="success" /> },
  { title: 'Events', to: '/events', icon: <EventIcon color="secondary" /> },
  { title: 'Analytics', to: '/analytics', icon: <InsightsIcon color="info" /> },
  { title: 'Info Hub', to: '/info', icon: <InfoIcon color="action" /> },
];

export default function Home() {
  return (
    <Stack spacing={6}>
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 3, p: { xs: 4, md: 8 }, bgcolor: 'background.paper' }}>
        <motion.div
          style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle at center, rgba(46,125,50,0.3), transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 6 }}
        />
        <Typography variant="h2" fontWeight={800} gutterBottom>
          Learn. Act. Thrive.
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth={640}>
          Environmental literacy for everyone — from curious kids to eco champions.
        </Typography>
        <Stack direction="row" spacing={2} mt={3}>
          <Button component={RouterLink} to="/learning" variant="contained" size="large">Start Learning</Button>
          <Button component={RouterLink} to="/signin" variant="outlined" size="large">Sign In</Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {cards.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.title}>
            <Card component={motion.div} whileHover={{ y: -4 }}>
              <CardActionArea component={RouterLink} to={c.to}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {c.icon}
                    <Typography variant="h6">{c.title}</Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom>Coming soon</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}><Typography>Points: 0</Typography></Grid>
          <Grid item xs={12} sm={4}><Typography>Badges: 0</Typography></Grid>
          <Grid item xs={12} sm={4}><Typography>Upcoming events: 0</Typography></Grid>
        </Grid>
      </Box>
    </Stack>
  );
}