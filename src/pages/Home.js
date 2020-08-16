import React from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import xButton from '../images/x-button.png';
import Data from '../data';
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
      currTime: 0,
      timer: "",
      motivation:"",
      cake:false,
    };

    this.signUpdate = this.signUpdate.bind(this);
    ApiCalendar.onLoad(() => {
                ApiCalendar.listenSign(this.signUpdate);
            });
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
    this.absReactTime = this.absReactTime.bind(this);
    this.absGoogleTime = this.absGoogleTime.bind(this);
    this.loadData = this.loadData.bind(this);
    this.updateMotivation = this.updateMotivation.bind(this);
  }

  updateMotivation(){
    //Update state
    var index = Math.floor(Math.random() * Data.motivation.length);
    this.setState({motivation:Data.motivation[index]});

    //Cake Is A Lie
    if (index === 0) this.setState({cake:true});
    else this.setState({cake:false});
  }

  componentDidMount(){
    this._mounted = true;
    this.updateMotivation();

    this.loadData();
    setInterval(this.loadData,200);

    /*var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    var currTotal = 3600*hours + 60*min + sec;
    console.log("INIT HOURS: " + hours);
    console.log("INIT MIN: " + min);
    console.log("INIT SEC: " + sec);
    console.log("INIT TOT: " + currTotal);
    this.setState({currTime:currTotal});*/


  }

  absGoogleTime(time) {
    var hours = parseInt(time.substring(11,13));
  	var min = parseInt(time.substring(14,16));
  	var sec = parseInt(time.substring(17,19));
    var total = hours*3600+ min*60 + sec;
    return total;
  }

  format(seconds){
    var hours = Math.floor(seconds / 3600);
    var min = Math.floor((seconds - hours*3600) / 60);
    var sec = seconds - hours*3600 - min*60;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    if (hours === 0) return (min + ":" + sec);
    else return (hours + ":" + min + ":" + sec);
  }

  async loadData(){
    try {
      //UPDATE TIME
      var hours = new Date().getHours();
      var min = new Date().getMinutes();
      var sec = new Date().getSeconds();
      var currTotal = 3600*hours + 60*min + sec;
      //console.log("BREAKDOWN: " + hours + ":" + min + ":" + sec);
      console.log("TOTAL CUR: " + currTotal);
      this.setState({currTime:currTotal});

      //UPDATE CALENDAR
      if (ApiCalendar.sign)
        ApiCalendar.listUpcomingEvents(1)
          .then(({result}: any) => {
            //console.log(result.items);
            //console.log("SUMMARY: " + result.items[0].summary);

            //Update Event Name & Color
            var newEvent = result.items[0].summary;
            var newColor = "color-" + result.items[0].colorId;
            this.setState({event:newEvent});
            this.setState({color:newColor});

            //Update Time
            var currEnd = this.absGoogleTime(result.items[0].end.dateTime);
            var currDelta = currEnd - currTotal;
            console.log("TOTAL END: " + currEnd);
            console.log("TOTAL DEL: " + currDelta);
            var currTimer = this.format(currDelta);
            console.log("FORMT DEL: " + currTimer);
            this.setState({timer:currTimer});
          });
    } catch (e) {
      console.log("======ERROR======");
      console.log(e);
    }
  }

  componentWillUnmount(){
    this._mounted = false;
  }

  componentDidUpdate(){

  }

  absReactTime = (time) => {
    return 4;
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
      //console.log("time to show view");
      //console.log("COLOR TIME: " + this.state.color);
      //<Redirect push to="/view" />
      return (
        <div id={this.state.color} className="App">
          <p className="prompt">you should be doing ...</p>
          <h1 className="event">{this.state.event}</h1>
          <h2 className="time">{this.state.timer}</h2>
          <p className="remaining">remaining</p>
          <h1 className="event">{this.state.motivation}</h1>
          {this.state.cake && <p className="disclaimer">*the cake is a lie</p>}
          <button className="refreshButton" onClick={this.updateMotivation}>⟳</button>
          <button className="signoutButton" onClick={this.signout}>Sign Out</button>
        </div>
      );
    }

    return (
      <header className="App">
        <p className="prompt">you should be ...</p>
        <button onClick={this.signin} className="signinButton">signing in with google</button>
        {/*<button className="signoutButton" onClick={this.signout}>SignOut</button>*/}
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
