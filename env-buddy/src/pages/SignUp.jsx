import { Box, Button, Card, CardContent, Grid, Stack, TextField, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PersonIcon from '@mui/icons-material/Person';
import GoogleIcon from '@mui/icons-material/Google';
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const { role } = useParams(); // student | school | ngo
  const [formData, setFormData] = useState({});

  // Change input values
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSignup = () => {
    alert(`${role.toUpperCase()} registered successfully!\n(Temporary frontend signup)`);
  };

  const fields = {
    student: [
      { label: "Full Name", name: "fullname" },
      { label: "Username", name: "username" },
      { label: "Email", name: "email", type: "email" },
      { label: "Password", name: "password", type: "password" },
    ],
    school: [
      { label: "School / College Name", name: "schoolName" },
      { label: "Email", name: "email", type: "email" },
      { label: "Password", name: "password", type: "password" },
      { label: "Registration ID", name: "regId" },
    ],
    ngo: [
      { label: "NGO Name", name: "ngoName" },
      { label: "Email", name: "email", type: "email" },
      { label: "Password", name: "password", type: "password" },
      { label: "Government Reg No.", name: "govRegNo" },
    ],
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 3 }}>
      <Grid item xs={12} md={8} lg={6}>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h4" fontWeight={800} textAlign="center">
                {role === "student" ? "Student" :
                 role === "school" ? "School / College" : "NGO"} Sign Up
              </Typography>

              <Stack spacing={2}>
                {fields[role].map((field, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    onChange={handleChange}
                  />
                ))}

                <Button variant="contained" size="large" onClick={handleSignup}>
                  Sign Up
                </Button>

                <Button variant="outlined" size="large" startIcon={<GoogleIcon />}>
                  Continue With Google
                </Button>

                <Typography variant="body2" textAlign="center">
                  Already have an account?{" "}
                  <Link to="/signin">Login</Link>
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
