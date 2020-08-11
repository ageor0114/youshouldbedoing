import React from 'react';
import logo from './logo.svg';
import './styling/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="landingPrompt">you should be ...</p>
        <button className="signinButton">signing in with google</button>
        <button className="helpButton">wait what is this?</button>
      </header>
    </div>
  );
}

export default App;
