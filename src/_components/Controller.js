import React, { Component } from 'react'
import '../App.css'


export default class Controller extends Component {
    constructor(props) {
      super(props);
      this.state = {
          searchValue: '',
          showHistory: false,
          history: [],
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
        const sec = dateObj.getSeconds()
        const msec = dateObj.getMilliseconds()
        const newHistory = [...this.state.history, { searchValue:newSearchValue, day, hour, min, sec, msec }]

        this.setState({ history: newHistory })
        this.props.changeDestination(newSearchValue)
        console.log(newHistory)
    }
    changeAndGo = (newSearchValue) => {
        this.changeSearchValue(newSearchValue)
        this.go(newSearchValue)
    }
    handleRandomClick = (event) => {
        let randInt = Math.floor(Math.random()*this.props.sweetInnCities.length)
        console.log(randInt)
        let randCity = this.props.sweetInnCities[randInt]
        console.log(randCity)

        this.changeAndGo(randCity)
    }
    handleHistoryClick = (events) => {
        const showHistoryNew = !this.state.showHistory
        this.setState({showHistory:showHistoryNew})
        console.log (showHistoryNew)
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
          <SelectCity sweetInnCities={this.props.sweetInnCities} changeAndGo={this.changeAndGo} />
          <button value="Random (Not Submit)" onClick={this.handleRandomClick}>Random SweatINN City</button>
          <button value="Show Search History" onClick={this.handleHistoryClick}>Show Search History</button>
          <p>{this.state.testString}</p>
          <p>{this.state.testString2}</p>
          <p>{this.state.testString3}</p>
          {this.state.showHistory? <HistoryDisplay history={this.state.history} changeAndGo={this.changeAndGo} /> : <div /> }
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
    clickHandler = (e) => {
        console.log(e.target.value)
        this.props.changeAndGo(e.target.textContent)
    }

    render(){
        const historyItems = this.props.history.map((historicSearch)=><tr key={historicSearch.day+historicSearch.hour+historicSearch.min +historicSearch.sec + historicSearch.msec}><td>{historicSearch.day}</td><td>{historicSearch.hour}:{historicSearch.min}</td><td><a href='#' onClick={this.clickHandler}>{historicSearch.searchValue}</a></td></tr>)
        return (
            <table>
                <thead><tr><th>Day</th><th>Hour</th><th>Search Value</th></tr></thead>
                <tbody>{historyItems}</tbody>
            </table>
        )
    }
}
