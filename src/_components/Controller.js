import React, { Component } from 'react'
import '../App.css'


export default class Controller extends Component {
    constructor(props) {
      super(props);
      this.state = {
          searchValue: '',
          showHistory: false,
          history: [],
          sweetInnCities : ["BARCELONA", "BRUSSELS", "JERUSALEM", "LISBON", "ROME", "TEL AVIV"],
          testString: "Test1",
          testString2: "Test2",
          testString3: "Test3",
          days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

      };

    }

    handleSearchFieldChange = (event) => {
      this.setState({searchValue: event.target.value});
    }

    handleSubmit = (event) => {
        // if (event.target.name=='submitSearch'){
            alert('A name was submitted: ' + this.state.searchValue + event.target.name);
            this.setState({testString:event.target.value})
            this.setState({testString2:event.target.name})
            event.preventDefault();
        // }
    }

    changeSearchValue = (newSearchValue)=>{
        this.setState ({
            searchValue:newSearchValue,
            testString3:newSearchValue
        })
    }
    go = (newSearchValue)=>{
        // var searchValue = newSearchValue
        var dateObj = new Date()
        var dayInt = dateObj.getDay()
        var day = this.state.days[dayInt]
        var hour = dateObj.getHours()
        var min = dateObj.getMinutes()
        const newHistory = [...this.state.history, { searchValue:newSearchValue, day, hour, min }]

        this.setState({ history: newHistory })
        console.log(newHistory)
    }
    changeAndGo = (newSearchValue) => {
        this.changeSearchValue(newSearchValue)
        this.go(newSearchValue)
    }
    handleRandomClick = (event) => {
        let randInt = Math.floor(Math.random()*this.state.sweetInnCities.length)
        console.log(randInt)
        let randCity = this.state.sweetInnCities[randInt]
        console.log(randCity)

        this.changeAndGo(randCity)
    }
    handleHistoryClick = (events) => {

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
          </form>
          <SelectCity sweetInnCities={this.state.sweetInnCities} changeAndGo={this.changeAndGo} />
          <button value="Random (Not Submit)" onClick={this.handleRandomClick}>Random SweatINN City</button>
          <button value="Show Search History" onClick={this.handleHistoryClick}>Show Search History</button>
          <p>{this.state.testString}</p>
          <p>{this.state.testString2}</p>
          <p>{this.state.testString3}</p>
          <HistoryDisplay history={this.state.history} />
        </section>
      );
    }
}

class SelectCity extends Controller {
        handleChange = (event) => {
            this.props.changeAndGo(event.target.value)
        }
        render (){
            const cityOptions = this.props.sweetInnCities.map((city) => <option key={city}>{city}</option>)
            return (
                <select onChange={this.handleChange}>
                    {cityOptions}
                </select>
            )
        }
}


class HistoryDisplay extends Component {


    render(){
        const historyItems = this.props.history.map((historicSearch)=><li>{historicSearch.searchValue}</li>)
        return (
            <ul>
                {historyItems}
            </ul>
        )
    }
}
