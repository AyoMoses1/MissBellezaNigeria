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
import FormControl from '@mui/material/FormControl';
import { FormHelperText, Input, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { width } from '@mui/system';

const columns = [
  { 
    field: 'Rank' , 
    headerName: 'Rank', 
    filterable: false,
    renderCell:(index) =>  index.api.getRowIndex(index.row.id) + 1,
    width: 20
},
  { field: 'name', headerName: 'Name', width:100},
  { field: 'votes', headerName: 'Votes', type:'number' },

  {
    field: 'age',
    headerName: 'Age',
    type: 'number'
  },
];


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
  const [searchTerm, setSearchTerm] = React.useState('')
  const [showRanking, setShowRanking] = React.useState(false)
  const [rankingIndex, setRankingIndex] = React.useState([])


  const contestantsCollectionRef = collection(db, "contestants")

  const newRows = contestants.map(cont => {
    return {id: cont.id, name: cont.name, votes: cont.votes, age:cont.age}
  })
  const ranks=[]
  const votes =  contestants.forEach( (cont) => {
    ranks.push(cont)
  })

  ranks?.sort((a,b) => b.votes-a.votes)
  
  React.useEffect(() => {
    const handleSearch = async() => {
      const docs = await getDocs(contestantsCollectionRef)
      setContestants(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      console.log(contestants, "contestants")
      if(searchTerm.length){
        const results = contestants.filter((cont) => {
          return cont.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setContestants(results)
        console.log(results, "results")
      }
    }

    handleSearch()
  }, [searchTerm])
  

  React.useEffect(() => {

    const getContestants = async() => {
      setLoading(true)
      const docs = await getDocs(contestantsCollectionRef)
      setContestants(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      setData(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      setLoading(false)
    }

    getContestants()
    
  }, [])


  const handleRanking = ()=> {
    setShowRanking(prev => !prev)
  }
  return (
    <ThemeProvider theme={theme}>
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
        <div className='btn-container'>
          <Button className='rank-btn' variant='contained' onClick={handleRanking}> {showRanking? "Hide Ranking" : "See Ranking"}</Button>
        </div>
          {
            showRanking ? 
            <div style={{ height: 400, width: '100%' }} className='ranking'>
              <DataGrid
                rows={ranks}
                columns={columns}
                pageSize={16}
                rowsPerPageOptions={[4]}
                className='table'
                // checkboxSelection
                
              />
            </div>
            :
          <>
           {
            loading ? 
            <CircularProgress className='loader' /> 
            :
            <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12}>
                <FormControl className='search-form'>
                  {/* <InputLabel htmlFor="my-input">Search Contestant</InputLabel>
                  <Input id="my-input" aria-describedby="my-helper-text" /> */}
                  <input  type="text" placeholder='Search Contestant' onChange={(e) => setSearchTerm(e.target.value)}/>
                </FormControl>
              </Grid>
              {contestants?.map((contestant) => (
                <Grid item key={contestant.id} xs={12} sm={6} md={4}>
                  <ContestantCard details = {contestant}/>
                </Grid>
              ))}
            </Grid>
          </Container>
        }
        </>
      }
        </main>
    </ThemeProvider>
  );
}
