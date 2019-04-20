import React, { Component } from 'react';
import './App.css';
import TopBar from './Component/TopBar/TopBar';
import StateBar from './Component/StateBar/StateBar';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Redirects from './Component/Redirects/Redirects'
import About from './Component/About/about'
/* import ContentBar from './Component/content/ContentBar'; */
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      page:0
    }
  }
  render() {
    return (
      <div className="App">
        
        <Router>
        <TopBar/>
          <Switch>
            <Route exact path="/" component={Redirects}/>
            <Route exact path="/home" component={StateBar}/>
            <Route exact path="/about" component={About}/>
          </Switch>
       </Router>
       

       </div>
     );
   }
}

export default App;