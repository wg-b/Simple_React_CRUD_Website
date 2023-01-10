import React, { useState } from "react";
import { useAppDispatch } from "store";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { sendEmail } from "store/actions/auth.action";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "components/ResponsiveAppBar";


const theme = createTheme();

export default function Contact() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    subject: string;
    message: string;
  }>({
    username: "",
    email: "",
    subject: "",
    message:"",
  });

  const [error, setError] = useState<{
    username: boolean;
    email: boolean;
    message: boolean;
    subject: boolean;
  }>({
    username: false,
    email: false,
    message: false,
    subject: false,
  });

  const handleChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    setError({
      ...error,
      [name]: false,
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hiddddddd", formData)
    if (
      !formData.email ||
      !formData.username ||
      !validateEmail(formData.email) ||
      !formData.message
    ) {
      setError({
        username: !formData.username,
        email: !formData.email || !validateEmail(formData.email),
        message: !formData.message,
        subject: !formData.subject,
      });
      return;
    }
    console.log("hi")
    dispatch<any>(
      sendEmail(formData)
    ).then(() => navigate("/"));
  };

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
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
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={error.username}
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="family-name"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={error.email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={error.subject}
                  fullWidth
                  id="subject"
                  label="Subject"
                  name="subject"
                  autoComplete="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={error.message}
                  fullWidth
                  multiline
                  id="message"
                  label="Message"
                  name="message"
                  autoComplete="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxRows={8}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
