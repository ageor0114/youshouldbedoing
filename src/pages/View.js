import React from 'react';
import { Redirect } from 'react-router';
import ApiCalendar from 'react-google-calendar-api';
import '../styling/App.css';

class View extends React.Component {
  _mounted = false;

  constructor(props) {
    super(props);

    this.state = {
      event:"⠀",
      loggedIn:"true"
    }

    this.update = this.update.bind(this);
    this.signout = this.signout.bind(this);
  }

  componentDidMount(){
    this._mounted = true;

    if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents(1)
        .then(({result}: any) => {
          console.log(result.items);
          console.log("SUMMARY: " + result.items[0].summary);
          var newEvent = result.items[0].summary;
          this.setState({event:newEvent});
        });
  }

  componentWillUnmount(){
    this._mounted = false;
  }

  signout = () => {
    this.setState({loggedIn:false});
    ApiCalendar.handleSignoutClick();
  }

  update = () => {
    console.log("abt to update");
    return <Redirect push to="/" />;

    //this.setState({loggedIn:false})
  }

  render(){
    if(this.state.loggedIn) console.log("VIEW: Logged In");
    else console.log("VIEW: Not Logged In");

    /*console.log("Welcome to View!!");
    if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents(1)
        .then(({result}: any) => {
          console.log(result.items);
          console.log("SUMMARY: " + result.items[0].summary);
          var newEvent = result.items[0].summary;
          this.setState({event:newEvent});
        })
    console.log("End of Console View!");*/

    if (!this.state.loggedIn) {
      console.log("bad bad nothing to see here");
      return <Redirect push to="/" />;
    }

    return (
      <div className="App">
        <p className="landingPrompt">you should be doing ...</p>
        <h1>{this.state.event}</h1>
        <button onClick={this.signout}>Sign Out</button>
        <button onClick={this.update}>Update</button>
      </div>
    );
  }
}

export default View;
