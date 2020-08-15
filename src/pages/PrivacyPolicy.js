import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/App.css';

class Home extends React.Component {

  render(){
    const policy = "⠀⠀Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n";
    return(
      <center>
      <div className="privacy">
        <h1>Privacy Policy</h1>
        <p>{policy}{policy}{policy}</p>
        <p>⠀⠀If you’d like to reach the creator directly, you can contact me <a className="hyperlink" href = "mailto: a2@berkeley.edu">here</a>.</p>
        <Link className="returnButton" to="/">🡠 get back to workin</Link>
      </div>
      </center>
    );
  }
}

export default Home;
