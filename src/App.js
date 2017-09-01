import React, { Component } from 'react'
import globeLogo from './globe.svg'
import './App.css'

import Controller from './_components/Controller.js'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <Controller />
          {/* <Presentation />
          <Footer /> */}
      </div>
    );
  }
}

function Header(){
    return (
        <div className="App-header">
            <img src={globeLogo} className="App-logo" alt="logo" />
          <h2>Choose My Next Destination</h2>
        </div>
    )
}

// class Controller extends Component {
//   render() {
//     return (
//         <div className="App-controller">
//             <SearchControl />
//             <HistoryDisplay />
//       </div>
//     );
//   }
// }





export default App;
