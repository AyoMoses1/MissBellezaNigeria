import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import { useFormik, Form, useField} from 'formik';
import TextField from '@mui/material/TextField';
import './contestant.css'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';



const ariaLabel = { 'aria-label': 'description' };

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const initialValues = {
  email: '',
  voteOptions: 0,
};
const ContestantCard = ({details}) =>{

  const navigate = useNavigate()

  const onSubmit = (values, actions) => {
    navigate('/checkout', { state: {...values, id: details?.id, votes: details?.votes}})
    // votes: (values.voteOptions/50), price: values.voteOptions } });
    // state={{...values, id:details?.id, votes:details?.votes}}
  }

  const {values,handleBlur, handleChange, handleSubmit, errors, touched} = useFormik({
    initialValues:initialValues,
    validationSchema : contestantSchema,
    onSubmit
  })
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const voteOptions = [{label:'10 Votes(₦500)', price:500},{label:'20 votes(₦1000)', price:1000},{label:'100 votes(₦5000)', price:5000},{label:'200 votes(₦10,000)', price:10000},{label:'400 votes(₦20,000)', price:20000},{label:'600 votes(₦30,000)', price:30000}, {label:'1000 Votes(₦50000)', price:50000}];
  const [expanded, setExpanded] = React.useState(false);
  
  return (
    <Card sx={{ maxWidth: 345 }} className="card-container">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" className='avatar'>
            {details.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={details.name}
        subheader={details.state}
      />
      <CardMedia
        component="img"
        height="194"
        image={details.img}
        alt="Paella dish"
        className='contestant-image'
      />
      <CardContent className='card-content'>
        <Typography variant="h4" color="text.secondary">Age: {details.age}</Typography>
        <Typography variant="h6" color="text.secondary">Votes: {details.votes}</Typography>
      </CardContent>
      <CardActions className='card-actions'>
        <Button size="small" onClick={handleExpandClick} className='vote-dropdown'>VOTE</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          className='expand-icon'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className='voting-form'>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              className='mb-4'
              name='email'
              // label='Product Price(₦)'
              label='Email'
              variant='outlined'
              margin='normal'
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || ''}
              // className={errors.email && touched.email ? 'input-error':"test"}
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
            />
            {errors.email && touched.email && <p className='error-text'>Please enter a valid email address</p>}
             <TextField
                // className='mb-4'
                name='voteOptions'
                label='Select Number of votes'
                variant='outlined'
                fullWidth
                select
                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                margin='normal'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.voteOptions || ''}
                className={errors.email ? 'input-error':""}
                // error={Boolean(touched.price && errors.price)}
                // helperText={touched.price && errors.price}
              >
                {voteOptions.sort().map((option) => (
                  <MenuItem value={option.price} key={option.price}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>
                {errors.voteOptions && touched.voteOptions && <p className='error-text'>Please select a valid amount of votes</p>}
                {/* <Link 
                  to="/checkout"
                  state={{...values, id:details?.id, votes:details?.votes}}
                > */}
                  <Button
                    className='mb-4 px-12 vote'
                    variant='contained'
                    color='primary'
                    type='submit'
                    fullWidth
                  >
                    Vote
                  </Button>
                {/* </Link> */}



            {/* <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            /> */}
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const contestantSchema = Yup.object().shape({
  // email: yup.string().required('Email is required'),
  email: Yup.string().email().required('Email address is required'),
  voteOptions: Yup.number().positive().integer().required("Please select a valid amount of votes")
});

export default ContestantCard
