import React, { Component } from 'react';
import globeLogo from './globe.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <Controller />
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

class Controller extends Component {
    constructor(props) {
      super(props);
      this.state = {
          searchValue: '',
          showHistory: false,
          history: {},
          sweetInnCities : ["BARCELONA", "BRUSSELS", "JERUSALEM", "LISBON", "ROME", "TEL AVIV"]
      };

    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
      this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <section className="App-controller">
          <form onSubmit={this.handleSubmit}>
              {/* <SearchControl /> */}
              <label>
                Name:
                <input type="text" value={this.state.searchValue} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Take me" />
              <SelcetCity sweetInnCities={this.state.sweetInnCities} />

              <input type="submit" value="Random SweatINN City" />
              <input type="submit" value="Show Search History" />
          </form>
          <HistoryDisplay />
        </section>
      );
    }
}

class SelcetCity extends Controller {
        constructor (props){
            super(props)
        }
        render (){
            const cityOptions = this.props.sweetInnCities.map((city)=><option>{city}</option>)
            return (
                <select>
                {cityOptions}
            </select>
            )
        }
}

class SearchControl extends Component {
    constructor (props){
        super(props)
    }
    render (){
        return (
            <div class="SearchControl">

            </div>
        )
    }
}

class HistoryDisplay extends Component {
    render(){
        return null
    }
}



export default App;
