import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import xButton from '../images/x-button.png';

import '../styling/App.css';

class Home extends React.Component {
  _mounted = false;
  constructor(props) {
    super(props);

    this.state = {
      event: "⠀",
      color: "color-0",
      visible: false,
      loggedIn:false,
      sign: ApiCalendar.sign,
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

  openModal(){
    this.setState({visible:true});
  }

  closeModal(){
    this.setState({visible:false});
  }

  render(){
    const desc1 = "is the one-stop backdrop to your productive life! it connects to your existing workflow in Google Calendar, and neatly presents your current and upcoming tasks in a full-window view — with a timer to tell you how much time remains for the current task.\n\nwhen you connect your account, ";
    const desc2 = " and never makes any changes to your calendar. you can check out the full ";
    const message = "\nhappy productive-ing! now get some f*cking work done.\n⠀";
    const request = "\nif this site helps you at all, or you have any suggestions to make it better, i’d really appreciate your ";
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
        <button className="helpButton" onClick={() => this.openModal()}><p className="helpText">wait what is this?</p></button>
        <Modal visible={this.state.visible} effect="fadeInUp" onClickAway={() => this.closeModal()}>
          <div className="modal">
            <button onClick={() => this.closeModal()}>
              <img src={xButton} className="xButton" alt="Close" />
            </button>
            <h1>youshouldbedoing.com</h1>
            <p>{desc1}<b>youshouldbedoing.com</b> uses <b>view-only access</b>{desc2}<Link className="hyperlink" to="/privacy">Privacy Policy</Link> here and the <a href="https://github.com/ageor0114/youshouldbedoing" target="_blank" rel="noopener noreferrer" className="hyperlink">source code</a> to this site!</p>
            <p>{request}<a href="https://austingeorge.dev" target="_blank" rel="noopener noreferrer" className="hyperlink">feedback</a>! every comment helps :)</p>
            <p>{message}</p>
            <p className="signature">- austin</p>
          </div>
        </Modal>
      </header>
    );
  }
}

export default Home;
