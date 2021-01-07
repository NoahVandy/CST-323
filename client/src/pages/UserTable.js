import '../App.css';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import EditUser from './EditUser';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: '#660066',
  },
  tableContainer: {
    maxWidth: 750,
    backgroundColor: '#660066',
  },
  button: {
    color: '#fff',
    backgroundColor: '#101010',
  },
  typo: {
    color: 'white',
  }
});

function UserTable({setUser}) {

  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState();

  const classes = useStyles();

  const onLogout = () => {
    setUser(null);
    console.log("logging out");
  }

  const onClickDelete = (userId) => {
    console.log("deleting user: " + userId);
    axios.post('http://localhost:3001/api/delete', 
    {
      id: userId,
    }).then((response) => {
      console.log(response);
      if(response.data.affectedRows === 1) {
        axios.get('http://localhost:3001/api/get').then((response) => {
        setUsers(response.data);
      });
      alert('successfully deleted');
      }
    });
    
  }

  const onClickEdit = (userId) => {
    setEditId(userId);
    setIsEditing(true);
  }

  useEffect(() => {
    axios.get('http://localhost:3001/api/get').then((response) => {
      setUsers(response.data);
    });
  },[isEditing]);

  return (
    <div>
      {isEditing ? (
        <EditUser 
          userId={editId}
          setIsEditing={setIsEditing}
        />
      ) : (
        <>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant='h5' className={classes.typo}>
                      First Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='h5' className={classes.typo}>
                      Last Name
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant='h5' className={classes.typo}>
                      Favorite Color
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant='h5' className={classes.typo}>
                      Favorite Team
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant='h5' className={classes.typo}>
                      Delete
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant='h5' className={classes.typo}>
                      Edit
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow>
                    <TableCell component="th" scope="row" className={classes.typo}>
                      {user.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row" className={classes.typo}>
                      {user.lastName}
                    </TableCell>
                    <TableCell align="right" className={classes.typo}>{user.favColor}</TableCell>
                    <TableCell align="right" className={classes.typo}>{user.favTeam}</TableCell>
                    <TableCell align="right" >
                      <Button
                        className={classes.button}
                        onClick={() => onClickDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell align="right" >
                      <Button
                        className={classes.button}
                        onClick={() => onClickEdit(user.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Button
            variant="contained"
            onClick={onLogout}
          >
            Logout
          </Button>
          <br />
          <br />
        </>
      )}
    </div>
  )
}

export default UserTable;