import { Box, Container, IconButton, Link, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="body2">© {new Date().getFullYear()} Environmental Buddy</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton component={Link} href="#" aria-label="GitHub">
            <GitHubIcon />
          </IconButton>
          <IconButton component={Link} href="#" aria-label="LinkedIn">
            <LinkedInIcon />
          </IconButton>
          <IconButton component={Link} href="#" aria-label="X">
            <XIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}