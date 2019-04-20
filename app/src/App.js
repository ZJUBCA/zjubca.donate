import React, { Component } from 'react';
import './App.css';
import TopBar from './Component/TopBar/TopBar';
import StateBar from './Component/StateBar/StateBar';
import { BrowserRouter as Router, Route} from "react-router-dom";
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
          <Route exact path="/zjubca.donate/" component={StateBar}/>
          <Route exact path="/zjubca.donate/home" component={StateBar}/>
          <Route exact path="/zjubca.donate/about" component={About}/>
       </Router>
       

       </div>
     );
   }
}

export default App;