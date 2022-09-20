import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaystackButton } from 'react-paystack';
import './checkout.css'
import { db } from '../../firebase-config';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://missbellezanigeria.com.ng/">
        Miss Belleza Nigeria 2022
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function Checkout() {
    const location = useLocation()

  
  const {state} = location
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

console.log(state)

  const publicKey = "pk_live_8124f7f5eee686ba67d38d054a6750951e0a43d3"
  
  const [email, setEmail] = React.useState(state?.email)
  const [name, setName] = React.useState("ayo")
  const [phone, setPhone] = React.useState("moses")
  const [price, setPrice] = React.useState(state?.voteOptions)




  const navigate = useNavigate()
  const handleCheck = async(id) => {
    const contestantDoc = doc(db, "contestants", id)
    const newField = {votes: state.votes + (price/50)}
    await updateDoc(contestantDoc, newField)
    navigate('/vote')
  }


  const componentProps = {
    email,
    amount:price * 100,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Vote Now",
    onSuccess: () => {
      setEmail("")
      setName("")
      setPhone("")
      handleCheck(state.id)
    },
    onClose: () => alert("Wait! You need to vote for your girl, Please don't go!!!!"),
  }
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className='checkout-container'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
            <HowToRegIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Vote Your Favorite Contestant
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <PaystackButton className="paystack-button" {...componentProps} />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}