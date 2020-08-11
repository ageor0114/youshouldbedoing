import React from 'react';
//import ApiCalendar from 'react-google-calendar-api';
import '../styling/App.css';

class Home extends React.Component {

  signin = () => {
    console.log("sign in here");
    //ApiCalendar.handleAuthClick();
  }
  render(){
    return (
      <header className="App">
        <p className="landingPrompt">you should be ...</p>
        <button onClick={this.signin} className="signinButton">signing in with google</button>
        <button className="helpButton">wait what is this?</button>
      </header>
    );
  }
}

export default Home;
