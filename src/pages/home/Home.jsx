import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './home.css'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='landingContainer'>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          className='card-container'
          component="img"
          alt="green iguana"
          height="400px"
          image="https://missbellezanigeria.com.ng/wp-content/uploads/2022/07/belley.jpg"
        />
        <CardContent className='card-content'>
          <h5>Miss Belleza Nigeria 2022</h5>
          <h6>Online Face Modelling Contest</h6>
          <span>Third Edition</span>
        </CardContent>
        <CardActions className='button-container'>
          <Link to='/vote'>
            <Button size="small">VOTE</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
