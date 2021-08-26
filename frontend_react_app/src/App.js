import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './style/custom.css';


import Register from "./container/pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
