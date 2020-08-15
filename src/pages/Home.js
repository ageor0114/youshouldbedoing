import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import '../styling/App.css';

class Home extends React.Component {
  _mounted = false;
  constructor(props) {
    super(props);

    this.state = {
      event: "⠀",
      color: "color-0",
      loggedIn:false,
      sign: ApiCalendar.sign
    };

    this.signUpdate = this.signUpdate.bind(this);
    ApiCalendar.onLoad(() => {
                ApiCalendar.listenSign(this.signUpdate);
            });
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
  }

  componentDidMount(){
    console.log("COMPONENT DID MOUNT");
    this._mounted = true;

    if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents(1)
        .then(({result}: any) => {
          console.log(result.items);
          console.log("SUMMARY: " + result.items[0].summary);
          var newEvent = result.items[0].summary;
          var newColor = "color-" + result.items[0].colorId;
          this.setState({event:newEvent});
          this.setState({color:newColor})
        });
  }

  componentWillUnmount(){
    this._mounted = false;
  }

  componentDidUpdate(){
    console.log("COMPONENT DID UPDATE");
    if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents(1)
        .then(({result}: any) => {
          console.log(result.items);
          console.log("SUMMARY: " + result.items[0].summary);
          var newEvent = result.items[0].summary;
          this.setState({event:newEvent});
          var newColor = "color-" + result.items[0].colorId;
          this.setState({color:newColor});
        });
  }

  signUpdate(sign: boolean): any {
      this.setState({
          sign
      })
  }

  signin = () => {

    console.log("X: " + this.state.sign);
    if (this.state.sign === false) ApiCalendar.handleAuthClick();
    console.log("Y: " + this.state.sign);

    //while(!ApiCalendar.sign) console.log("boop");
  }

  signout = () => {
    this.setState({loggedIn:false});
    ApiCalendar.handleSignoutClick();
  }

  redirect = () => {
    console.log("redirect");
    this.setState({loggedIn:true})
  }

  render(){
    if (/*this.state.loggedIn*/ApiCalendar.sign) {
      console.log("time to show view");
      console.log("COLOR TIME: " + this.state.color);
      //<Redirect push to="/view" />
      return (
        <div id={this.state.color} className="App">
          <p className="prompt">you should be doing ...</p>
          <h1 className="event">{this.state.event}</h1>
          <h2 className="time">55:59</h2>
          <p className="remaining">remaining</p>
          <h1 className="event">Now go f*cking do it.</h1>
          <button className="signoutButton" onClick={this.signout}>Sign Out</button>
        </div>
      );
    }

    return (
      <header className="App">
        <p className="prompt">you should be ...</p>
        <button onClick={this.signin} className="signinButton">signing in with google</button>
        <button className="signoutButton" onClick={this.signout}>SignOut</button>
        <button className="helpButton"><p className="helpText">wait what is this?</p></button>
      </header>
    );
  }
}

export default Home;
