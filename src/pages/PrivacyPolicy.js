import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/App.css';

class Home extends React.Component {

  render(){
    const policy1 = " so that you can get an accessible and lightweight view of your Google calendar data. The only data requested in this site is the name, color, start time, and end time of your upcoming calendar events.\n\nThis site will never add, delete, or make any changes to your calendar data. The calendar data requested is never stored directly to this site and will never be shared with any other site. It is used exclusively to display to you for the period that you're signed in.\n\n";
    const policy2 = " is commited to ensuring that your data is used responsibly and sparingly (only what is absolutely neccessary to display your schedule). If you’d like to reach the creator directly, you can contact me ";
    return(
      <center>
      <div className="privacy">
        <h1>Privacy Policy</h1>
        <p>This site uses <a className="hyperlink" href = "https://www.googleapis.com/auth/calendar.events.readonly" target="_blank" rel="noopener noreferrer">https://www.googleapis.com/auth/calendar.events.readonly</a>{policy1}<b>youshouldbedoing.com</b>{policy2}<a className="hyperlink" href = "mailto: a2@berkeley.edu">here</a>.</p>
        <Link className="returnButton" to="/">🡠 get back to workin</Link>
      </div>
      </center>
    );
  }
}

export default Home;
