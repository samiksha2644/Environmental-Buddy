import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const topics = [
  { title: "Recycling", to: "/quiz?topic=recycling", icon: "♻️", active: true },
  { title: "Coming Soon", icon: "⏳", active: false },
];

export default function Info() {
  const theme = useTheme();

  const getCardStyle = (active) => ({
    flex: 1,
    bgcolor: active
      ? theme.palette.background.paper
      : theme.palette.action.disabledBackground,
    borderRadius: 4,
    border: active
      ? `2px solid ${theme.palette.divider}`
      : `2px dashed ${theme.palette.text.disabled}`,
    opacity: active ? 1 : 0.6,
    pointerEvents: active ? "auto" : "none",
    cursor: active ? "pointer" : "default",
    boxShadow: "none",
    transition: "all 0.3s ease",
  });

  return (
    <Stack spacing={6}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          p: { xs: 4, md: 8 },
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        {/* Radial Gradient Circle */}
        <Box
          sx={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "radial-gradient(circle at center, rgba(39, 46, 176, 0.3), transparent 70%)",
          }}
        />
        <Typography variant="h2" fontWeight={800} gutterBottom>
          Info Hub 
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth={640}>
          Explore informative topics on recycling and sustainability to make a positive impact on the environment.
        </Typography>
      </Box>

      {/* Topics Section */}
      <Grid container spacing={3} justifyContent="flex-start">
        {topics.map((t) => (
          <Grid
            item
            xs={12}
            sm={6}
            key={t.title}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: t.active ? "pointer" : "default",
              transition: "all 0.3s ease",
            }}
          >
            <Stack
              spacing={1}
              component={t.active ? RouterLink : "div"}
              to={t.active ? t.to : undefined}
              sx={{
                textDecoration: "none",
                color: t.active ? theme.palette.text.primary : theme.palette.text.disabled,
              }}
            >
              <Typography variant="h2">{t.icon}</Typography>
              <Typography variant="h6">{t.active ? t.title : "Coming Soon"}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
