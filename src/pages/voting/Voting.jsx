import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import axios from 'axios'
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContestantCard from '../../components/contestant/Contestant';
import contestants from '../../data';
import './voting.css'
import { db } from './../../firebase-config';
import { collection, getDocs } from "firebase/firestore"
import CircularProgress from '@mui/material/CircularProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Voting() {

  const [data, setData] = React.useState([])
  const [contestants, setContestants] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const contestantsCollectionRef = collection(db, "contestants")



  React.useEffect(() => {

    const getContestants = async() => {
      setLoading(true)
      const docs = await getDocs(contestantsCollectionRef)
      setContestants(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      setLoading(false)
    }

    getContestants()
    
  }, [])


  return (
    <ThemeProvider theme={theme} className="flex-loader">
      <CssBaseline />
      <AppBar position="relative" className='nav'>
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Miss Belleza 2022 Contestants
          </Typography>
        </Toolbar>
      </AppBar>
        <main>

           {
            loading ? 
            <CircularProgress className='loader' /> 
            :
            <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
              {contestants?.map((contestant) => (
                <Grid item key={contestant.id} xs={12} sm={6} md={4}>
                  <ContestantCard details = {contestant}/>
                </Grid>
              ))}
            </Grid>
          </Container>
        }
        </main>
    </ThemeProvider>
  );
}
