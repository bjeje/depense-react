import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MainRouter from "./Routes/MainRouter";
import './App.css';

function App({state}) {
  return (
      <Router>
        <MainRouter state={state}/>
      </Router>
  );
}

export default App;
