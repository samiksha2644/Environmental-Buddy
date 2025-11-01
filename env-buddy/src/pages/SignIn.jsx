import { Box, Button, Card, CardContent, Grid, Stack, Tab, Tabs, Typography, TextField, Link as MuiLink } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SignIn() {
  const [tab, setTab] = useState(0);
  const [orgType, setOrgType] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userTypeFromUrl = params.get("type");

  // ✅ Detect role based on URL query
  useEffect(() => {
    if (userTypeFromUrl === "student") {
      setTab(0);
      setOrgType(null);
    } else if (userTypeFromUrl === "school") {
      setTab(1);
      setOrgType("school");
    } else if (userTypeFromUrl === "ngo") {
      setTab(1);
      setOrgType("ngo");
    }
  }, [userTypeFromUrl]);

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h4" fontWeight={800} textAlign="center">Sign In</Typography>

              <Tabs value={tab} onChange={(_, v) => { setTab(v); setOrgType(null); }} variant="fullWidth">
                <Tab icon={<PersonIcon />} iconPosition="start" label="Student" />
                <Tab icon={<BusinessIcon />} iconPosition="start" label="Organization" />
              </Tabs>

              {/* ✅ STUDENT LOGIN */}
              {tab === 0 && (
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Student Login</Typography>

                  <TextField label="Username/email" fullWidth />
                  <TextField label="Password" type="password" fullWidth />

                  <Button variant="contained" size="large">Login</Button>

                  <Button variant="outlined" size="large" startIcon={<GoogleIcon />}>
                    Continue with Google
                  </Button>

                  <Typography variant="body2" textAlign="center">
                    Don't have an account?{" "}
                    <MuiLink component={Link} to="/signup/student" underline="none" fontWeight={600}>
                      Sign Up
                    </MuiLink>
                  </Typography>
                </Stack>
              )}

              {/* ✅ ORG SELECT BOXES */}
              {tab === 1 && !orgType && (
                <Stack spacing={3}>
                  <Typography variant="subtitle1">Select Organization Type</Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box 
                        sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, cursor: 'pointer' }}
                        onClick={() => setOrgType("school")}
                      >
                        <Stack spacing={1} alignItems="flex-start">
                          <SchoolIcon color="primary" />
                          <Typography variant="h6">School / College</Typography>
                          <Typography variant="body2" color="text.secondary">For educational institutions</Typography>
                        </Stack>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box 
                        sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, cursor: 'pointer' }}
                        onClick={() => setOrgType("ngo")}
                      >
                        <Stack spacing={1} alignItems="flex-start">
                          <VolunteerActivismIcon color="secondary" />
                          <Typography variant="h6">NGO</Typography>
                          <Typography variant="body2" color="text.secondary">Non-profit organizations</Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              )}

              {/* ✅ SCHOOL / NGO LOGIN */}
              {tab === 1 && orgType && (
                <Stack spacing={2}>
                  <Typography variant="subtitle1">
                    {orgType === "school" ? "School / College Login" : "NGO Login"}
                  </Typography>

                  <TextField label="Email" type="email" fullWidth />
                  <TextField label="Password" type="password" fullWidth />

                  <Button variant="contained" size="large">Login</Button>

                  <Button variant="outlined" size="large" startIcon={<GoogleIcon />}>
                    Continue with Google
                  </Button>

                  <Typography variant="body2" textAlign="center">
                    New here?{" "}
                    <MuiLink
                      component={Link}
                      to={`/signup/${orgType}`}
                      underline="none"
                      fontWeight={600}
                    >
                      Sign Up
                    </MuiLink>
                  </Typography>

                  <Button
                    variant="text"
                    onClick={() => setOrgType(null)}
                    sx={{ fontSize: "0.75rem", mt: 1 }}
                  >
                    Back
                  </Button>
                </Stack>
              )}

            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}