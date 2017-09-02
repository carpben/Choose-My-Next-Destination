import React, { Component } from 'react'
import '../App.css'


export default class ControlPanel extends Component {
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

    changeSearchValue = (newSearchValue)=>{
        this.setState ({
            searchValue:newSearchValue,
        })
    }
    go = (newSearchValue)=>{
        // var searchValue = newSearchValue
        const dateObj = new Date()
        const dayInt = dateObj.getDay()
        const day = this.state.days[dayInt]
        const hour = dateObj.getHours()
        const min = dateObj.getMinutes()
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
    handleSearchFieldChange = (event) => {
      this.changeSearchValue(event.target.value);
    }

    handleSubmit = (event) => {
            this.go(this.state.searchValue)
            event.preventDefault();
    }
    handleRandomClick = (event) => {
        let randInt = Math.floor(Math.random()*this.props.sweetInnCities.length)
        let randCity = this.props.sweetInnCities[randInt]
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
          <form onSubmit={this.handleSubmit} className="form-inline">
              <div className="form-div">
                  <label>Search It Up</label>
                  <input className="form-control" type="text" placeholder="Enter City Name" />
                  <input className="btn" type="submit" value="Visit" />
                  <button className="btn" onClick={this.handleHistoryClick}>Show History</button>
              </div>
          </form>
          <form onSubmit={this.handleSubmit} className="form-inline">
              <div className="form-group">
                  <SelectCity sweetInnCities={this.props.sweetInnCities} changeAndGo={this.changeAndGo} />
                  <button className="btn" onClick={this.handleRandomClick}>Random SweatINN City</button>
              </div>
          </form>

          {this.state.showHistory? <HistoryDisplay history={this.state.history} changeAndGo={this.changeAndGo} /> : <div /> }
        </section>
      );
    }
}

class SelectCity extends Component {
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
        const historyItems = this.props.history.map( (historicSearch) => {
            const min = historicSearch.min<10 ? `0${historicSearch.min}` : historicSearch.min
            return <tr key={historicSearch.day+historicSearch.hour+historicSearch.min +historicSearch.sec + historicSearch.msec}><td>{historicSearch.day}</td><td>{historicSearch.hour}:{min}</td><td><a href='#goToCity' onClick={this.clickHandler}>{historicSearch.searchValue}</a></td></tr>
        })
        return (
            <table className='HistoryDisplay'>
                <thead><tr><th>Day</th><th>Hour</th><th>Search Value</th></tr></thead>
                <tbody>{historyItems}</tbody>
            </table>
        )
    }
}
