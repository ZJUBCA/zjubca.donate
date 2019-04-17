import React, { Component } from 'react';
import './App.css';
import TopBar from './Component/TopBar/TopBar';
import StateBar from './Component/StateBar/StateBar';
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
       <TopBar/>
       <StateBar/>

       </div>
     );
   }
}

export default App;