import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Divider,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

export default function Analytics() {
  const theme = useTheme();

  const [inputs, setInputs] = useState({
    electricity: "",
    fuel: "",
    travel: "",
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const electricityCO2 = Number(inputs.electricity) * 0.92;
    const fuelCO2 = Number(inputs.fuel) * 2.31;
    const travelCO2 = Number(inputs.travel) * 0.15;
    const total = electricityCO2 + fuelCO2 + travelCO2;

    setResults({
      electricityCO2,
      fuelCO2,
      travelCO2,
      total,
    });
  };

  return (
    <Box sx={{ pb: 5 }}>
      {/* ⭐ HERO SECTION ADDED HERE ⭐ */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          p: { xs: 4, md: 8 },
          bgcolor: "background.paper",
          mb: 5,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(4, 154, 82, 0.3), transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />

        <Typography variant="h2" fontWeight={800} gutterBottom>
          Carbon Footprint Analytics
        </Typography>

        <Typography variant="h6" color="text.secondary" maxWidth={640}>
          Calculate and understand your environmental impact using our
          simplified footprint estimator.
        </Typography>
      </Box>

      {/* Calculator Section */}
      <Card elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Carbon Footprint Calculator
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Electricity Usage (kWh)"
                name="electricity"
                fullWidth
                value={inputs.electricity}
                onChange={handleChange}
                type="number"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Fuel Usage (Liters)"
                name="fuel"
                fullWidth
                value={inputs.fuel}
                onChange={handleChange}
                type="number"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Distance Traveled (Km)"
                name="travel"
                fullWidth
                value={inputs.travel}
                onChange={handleChange}
                type="number"
              />
            </Grid>

            <Grid item xs={12} mt={1}>
              <Button
                variant="contained"
                size="large"
                onClick={calculate}
                sx={{ borderRadius: 2 }}
              >
                Calculate Footprint
              </Button>
            </Grid>
          </Grid>

          {results && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" fontWeight={600} mb={2}>
                Your Carbon Footprint Summary
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card
                    elevation={2}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[900]
                          : theme.palette.grey[100],
                    }}
                  >
                    <Typography variant="body1" mb={1}>
                      <strong>Electricity:</strong>{" "}
                      {results.electricityCO2.toFixed(2)} kg CO₂
                    </Typography>
                    <Typography variant="body1" mb={1}>
                      <strong>Fuel:</strong> {results.fuelCO2.toFixed(2)} kg CO₂
                    </Typography>
                    <Typography variant="body1">
                      <strong>Travel:</strong> {results.travelCO2.toFixed(2)} kg
                      CO₂
                    </Typography>

                    <Typography
                      variant="h6"
                      fontWeight={700}
                      mt={2}
                      color="primary"
                    >
                      Total: {results.total.toFixed(2)} kg CO₂
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
