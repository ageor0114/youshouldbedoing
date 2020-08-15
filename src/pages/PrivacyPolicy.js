import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/App.css';

class Home extends React.Component {

  render(){
    const policy = " to show the user's Google calendar data — so that users can get an accessible and lightweight view of their current schedule. The only data requested in this site is the name, color, start time, and end time of the user's upcoming calendar events.\n\nThis site will never add, delete, or make any changes to the user's calendar data. The calendar data requested from the user is never stored directly to this site and is never shared with any other site. It is used exclusively to display to the user for the period that they are signed in.\n\nyoushouldbedoing.com is commited to ensuring that your data is used responsibly and sparingly (only what is absolutely neccessary to display your schedule). if you’d like to reach the creator directly, you can contact me ";
    return(
      <center>
      <div className="privacy">
        <h1>Privacy Policy</h1>
        <p>This site uses <a className="hyperlink" href = "https://www.googleapis.com/auth/calendar.events.readonly" target="_blank" rel="noopener noreferrer">https://www.googleapis.com/auth/calendar.events.readonly</a>{policy}<a className="hyperlink" href = "mailto: a2@berkeley.edu">here</a>.</p>
        <Link className="returnButton" to="/">🡠 get back to workin</Link>
      </div>
      </center>
    );
  }
}

export default Home;
