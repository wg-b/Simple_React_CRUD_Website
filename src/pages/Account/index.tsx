import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
} from "@mui/material";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Account() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ManageAccountsRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Settings
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container>
              <Grid item xs>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="first-name"
                  label="First Name"
                  name="first-name"
                  autoComplete="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs sx={{ ml: "20px" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="last-name"
                  label="Last Name"
                  name="last-name"
                  autoComplete="last-name"
                  autoFocus
                />
              </Grid>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="current password"
              label="Currnet Password"
              name="current password"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Change password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Settings
            </Button>

            <Link href="/#/sign-up" variant="body2">
              {"Close"}
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
