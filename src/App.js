import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Advanced Library Book Management</h1>
      <br/>
      <Link className="nav-link text-white ms-3" to={'/signup'}>Signup</Link>
      <br/>
      <Link className="nav-link text-white ms-3" to={'/login'}>login</Link>
      <br/>
      <Link className="nav-link text-white ms-3" to={'/stafflogin'}>Staff Login</Link>

    </div>
  );
}

export default App;
