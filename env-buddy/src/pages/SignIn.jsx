import { Box, Button, Card, CardContent, Divider, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignIn() {
  const [tab, setTab] = useState(0);

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h4" fontWeight={800} textAlign="center">Sign In</Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Choose your profile to continue
              </Typography>

              <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
                <Tab icon={<PersonIcon />} iconPosition="start" label="Student" />
                <Tab icon={<BusinessIcon />} iconPosition="start" label="Organization" />
              </Tabs>

              {tab === 0 && (
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Student</Typography>
                  <Button variant="contained" size="large">Continue with Email</Button>
                  <Button variant="outlined" size="large" startIcon={<GoogleIcon />}>Continue with Google</Button>
                </Stack>
              )}

              {tab === 1 && (
                <Stack spacing={3}>
                  <Typography variant="subtitle1">Organization</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                        <Stack spacing={1} alignItems="flex-start">
                          <SchoolIcon color="primary" />
                          <Typography variant="h6">School / College</Typography>
                          <Typography variant="body2" color="text.secondary">For educational institutions</Typography>
                          <Button variant="contained" size="small">Continue</Button>
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                        <Stack spacing={1} alignItems="flex-start">
                          <VolunteerActivismIcon color="secondary" />
                          <Typography variant="h6">NGO</Typography>
                          <Typography variant="body2" color="text.secondary">For non-profit organizations</Typography>
                          <Button variant="contained" size="small">Continue</Button>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Stack spacing={2}>
                    <Button variant="outlined" size="large">Continue with Email</Button>
                    <Button variant="outlined" size="large" startIcon={<GoogleIcon />}>Continue with Google</Button>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}