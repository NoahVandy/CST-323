import '../App.css';
import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#660066',
    display: 'flex',
    padding: 50,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  loginInput: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& label': {
      color: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInputBase-input': {
      color: '#fff',
    },
    color: '#fff',
  }
});

function EditUser({ userId, setIsEditing }) {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [favColor, setFavColor] = useState('');
  const [favTeam, setFavTeam] = useState('');
  const [errors, setErrors] = useState();


  useEffect(() => {
    axios.get(`http://localhost:3001/api/get/${userId}`)
    .then((response) => {
      setFirstName(response.data[0].firstName);
      setLastName(response.data[0].lastName);
      setFavColor(response.data[0].favColor);
      setFavTeam(response.data[0].favTeam);
    });
  },[userId])

  const onChangeInput = (event) => {
    if(event?.target?.id === 'firstName') {
      setFirstName(event.target.value);
    }
    else if(event?.target?.id === 'lastName') {
      setLastName(event.target.value);
    }
    else if(event?.target?.id === 'favColor') {
      setFavColor(event.target.value);
    }
    else if(event?.target?.id === 'favTeam') {
      setFavTeam(event.target.value);
    }
  }

  const onSubmit = () => {

    if(firstName === '') {
      if(lastName === '') {
        setErrors({
          firstError: 'Please enter your first name',
          lastError: 'Please enter your last name',
        });
        console.log("failed on both: " + firstName + " " + lastName);
        return;
      }
      setErrors({
        firstError: 'Please enter your first name',
        lastError: null,
      });
      return;
    }
    if(lastName === '') {
      console.log("failed on lastName: " + lastName)
      if(firstName === '') {
        setErrors({
          firstError: 'Please enter your first name',
          lastError: 'Please enter your last name',
        });
        console.log("failed on both: " + firstName + " " + lastName);
        return;
      }
      setErrors({
        firstError: null,
        lastError: 'Please enter your last name',
      });
      return;
    }
    if (firstName?.trim?.length && lastName?.trim?.length){
      console.log("made it through");
      setErrors({
        firstError: null,
        lastError: null,
      });
    }

    axios.post('http://localhost:3001/api/update', 
    {
      id: userId,
      firstName: firstName, 
      lastName: lastName,
      favColor: favColor,
      favTeam: favTeam
    }).then((response) => {
      if(response.data.affectedRows === 1) {
        setIsEditing(false);
        alert('successfully updated');
      }
    });
  }

  return (
    <div className="App">
      <header className={classes.container}>
        <Typography
          variant='h3'
        >
          Edit User: {firstName + ' ' + lastName}
        </Typography>
        <br />
        <TextField 
          id="firstName" 
          label="First Name" 
          variant="standard"
          value={firstName}
          className={classes.loginInput}
          onChange={onChangeInput} 
        />
        {errors?.firstError ? (
          <Typography 
            color='error'
          >
            {errors.firstError}
          </Typography>
        ) : (
          <>
          </>
        )}
        <TextField 
          id="lastName" 
          label="Last Name" 
          variant="standard"
          value={lastName}
          className={classes.loginInput}
          onChange={onChangeInput} 
        />
        {errors?.lastError ? (
          <Typography 
            color='error'
          >
            {errors.lastError}
          </Typography>
        ) : (
          <>
          </>
        )}
        <TextField 
          id="favColor" 
          label="Favorite Color" 
          variant="standard"
          value={favColor}
          className={classes.loginInput}
          onChange={onChangeInput} 
        />
        <TextField 
          id="favTeam" 
          label="Favorite Team" 
          variant="standard"
          value={favTeam}
          className={classes.loginInput}
          onChange={onChangeInput} 
        />
        <br />
        <Button
          variant="contained"
          onClick={onSubmit}
        >
          Update
        </Button>
      </header>
    </div>
  );
}

export default EditUser;
