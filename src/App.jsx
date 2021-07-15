import {Route, Switch} from 'react-router-dom'
import { Nav, Navbar, Button, Image, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from './contexts/AuthContext'

import './App.css';

import PrivateRoute from './components/PrivateRoute';

import LoginView from './views/LoginView';
import TestView from './views/TestView';
import HighScoreView from './views/HighScoreView';

function App() {
  const {currentUser, signOut} = useAuth()

  return (
      <>
        <Navbar variant="dark" bg="dark">
          <Navbar.Brand>Type Test</Navbar.Brand>
          {currentUser && (
            <>
              <Navbar.Collapse>
                <LinkContainer to="/">
                  <Nav.Link>Type Test</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/high-scores">
                  <Nav.Link>High Scores</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
              </Navbar.Collapse>

              <Navbar.Collapse className="justify-content-end">
                <Image src={currentUser.photoURL} roundedCircle className='profile-photo' />
                <p style={{margin: "0 10px 0 0", color: "white"}}>{currentUser.displayName}</p>
                <Button variant="outline-danger" onClick={signOut}>Sign Out</Button>
              </Navbar.Collapse>
            </>
          )}
        </Navbar>
        <Switch>
          <PrivateRoute exact path="/" component={TestView} />
          <PrivateRoute exact path="/high-scores" component={HighScoreView} />
          <Route exact path="/login" component={LoginView} />
        </Switch>
      </>
  );
}

export default App;
