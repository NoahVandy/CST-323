import './App.css';
import React, {useState} from 'react';

import LoginPage from './pages/LoginPage';
import UserTable from './pages/UserTable';

import Typography from '@material-ui/core/Typography';

function App() {
const [user, setUser] = useState();

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <>
            <br />
            <br />
            <Typography variant='h5'>
              Current User
            </Typography>
            <Typography variant='h5'>
              First Name: {user.firstName}
            </Typography>
            <Typography variant='h5'>
              Last Name: {user.lastName}
            </Typography>
            <br />
            <UserTable
              setUser={setUser}
            />
          </>
        ) : (
          <LoginPage 
            user={user}
            setUser={setUser}
          />
        )}
      </header>
    </div>
  );
}

export default App;
