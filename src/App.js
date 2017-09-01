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
          sweetInnCities : ["BARCELONA", "BRUSSELS", "JERUSALEM", "LISBON", "ROME", "TEL AVIV"],
          testString: "Test1",
          testString2: "Test2"

      };

    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearchFieldChange = (event) => {
      this.setState({searchValue: event.target.value});
    }

    handleSubmit = (event) => {
        // if (event.target.name=='submitSearch'){
            alert('A name was submitted: ' + this.state.searchValue + event.target.name);
            this.setState({testString:event.target.value})
            this.setState({testString:event.target.name})
            event.preventDefault();
        // }
    }

    changeSearchValue = (newSearchValue)=>{
        this.setState ({searchValue:newSearchValue})
    }
    go = ()=>{
        alert('A name was submitted: ' + this.state.searchValue);
    }
    changeAndGo = (newSearchValue) => {
        this.changeSearchValue(newSearchValue)
        this.go()
    }

    render() {
      return (
        <section className="App-controller">
          <form onSubmit={this.handleSubmit}>
              {/* <SearchControl /> */}
              <label>
                Name:
                <input type="text" value={this.state.searchValue} onChange={this.handleSearchFieldChange} />
              </label>
              <input type="submit" name="submitSearch" id='submitSearch' value="Take me" />
              <SelcetCity sweetInnCities={this.state.sweetInnCities} changeAndGo={this.changeAndGo} />
              <input type="submit" value="Random SweatINN City" />
              <input type="submit" value="Show Search History" />
          </form>
          <p>{this.state.testString}</p>
          <p>{this.state.testString2}</p>
          <HistoryDisplay />
        </section>
      );
    }
}

class SelcetCity extends Controller {
        constructor (props){
            super(props)
        }
        handleChange = (event) => {
            this.props.changeAndGo(event.target.value)
        }
        render (){
            const cityOptions = this.props.sweetInnCities.map((city)=><option>{city}</option>)
            return (
                <select onChange={this.handleChange}>
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
