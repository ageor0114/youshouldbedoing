import React from 'react';
import { Redirect } from 'react-router';
import ApiCalendar from 'react-google-calendar-api';
import '../styling/App.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn:false,
      sign: ApiCalendar.sign
    };

    this.signUpdate = this.signUpdate.bind(this);
    ApiCalendar.onLoad(() => {
                ApiCalendar.listenSign(this.signUpdate);
            });
    this.signin = this.signin.bind(this);
  }

  signUpdate(sign: boolean): any {
      this.setState({
          sign
      })
  }

  signin = () => {
    console.log("sign in here");
    //ApiCalendar.handleSignoutClick();

    console.log("X: " + this.state.sign);
    if (this.state.sign == false) ApiCalendar.handleAuthClick();
    console.log("Y: " + this.state.sign);
    /*if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents(1)
        .then(({result}: any) => {
          console.log(result.items);
          console.log("XTEST: " + result.items[0].summary);
        });
    else ApiCalendar.handleAuthClick();*/
    console.log("just signed in");

    //while(!ApiCalendar.sign) console.log("boop");
  }

  redirect = () => {
    console.log("redirect");
    this.setState({loggedIn:true})
  }

  /*const loadClientWhenGapiReady = timer => {
    if (timer === 0) return;
    if (ApiCalendar.sign) {
      if (window.location.hostname === 'localhost') {
        getEvents().then(eventsLit => {
          setValidEvents(true);
          setEvents(eventsLit);
        });
      }
    } else {
      setTimeout(() => {
        loadClientWhenGapiReady(timer - 1);
      }, 100);
    }
  }

  loadSingIn = () => {
    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign(ApiCalendar.sign);
    });
    loadClientWhenGapiReady(100);
  };

  handleItemClick = (event, name) => {
    event.preventDefault();
    if (name === 'sign-in') {
      loadSingIn();
      ApiCalendar.handleAuthClick();
    } else if (name === 'sign-out') {
      ApiCalendar.handleSignoutClick();
    }
  };*/

  render(){
    if (/*this.state.loggedIn*/ApiCalendar.sign) {
      console.log("time to show view")
      return <Redirect push to="/view" />;
    }

    return (
      <header className="App">
        {/*
        {validEvents && (
          <div>
            <p className="landingPrompt">you should be doing ...</p>
            <h1>{this.state.event}</h1>
          </div>
        )}
        {!validEvents && (
          <div>
          <p className="landingPrompt">you should be ...</p>
          <button onClick={this.signin} className="signinButton">signing in with google</button>
          <button onClick={e => handleItemClick(e, 'sign-in')}>SIGNING IN WITH GOOGLE</button>
          <button className="helpButton">wait what is this?</button>
          </div>
        )}
        */}
        <p className="landingPrompt">you should be ...</p>
        <button onClick={this.signin} className="signinButton">signing in with google</button>
        {/*<button onClick={e => handleItemClick(e, 'sign-in')}>SIGNING IN WITH GOOGLE</button>*/}
        <button onClick={this.redirect}>Redirect</button>
        <button className="helpButton">wait what is this?</button>
      </header>
    );
  }
}

export default Home;
