import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import ApiCalendar from 'react-google-calendar-api';
import './styling/App.css';

import HomePage from './pages/Home';
import ViewPage from './pages/View';
import PrivacyPolicy from './pages/PrivacyPolicy';

class App extends React.Component {
  render(){
    return (
      <Router>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/view" component={ViewPage}/>
        <Route exact path="/privacy" component={PrivacyPolicy}/>
      </Router>
    );
  }
}

export default App;
