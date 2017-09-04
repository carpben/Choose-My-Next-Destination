import React, { Component } from 'react'
import '../App.css'


export default class ControlPanel extends Component {
    constructor(props) {
      super(props);
      this.state = {
          searchInput: '',
          showHistory: false,
          history: [],
          sweetInnCities : ["BARCELONA", "BRUSSELS", "JERUSALEM", "LISBON", "ROME", "TEL AVIV"],
      };
    }

    changeSearchInput = (newSearchInput)=>{
        // Controls the value of the search input.
        this.setState ({
            searchInput:newSearchInput,
        })
    }
    updateHistory = (newLocation) => {
        // updates the this.state.history
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const dateObj = new Date()
        const dayInt = dateObj.getDay()
        const day = days[dayInt]
        const hour = dateObj.getHours()
        const min = dateObj.getMinutes()
        const sec = dateObj.getSeconds() //seconds and milsecs are collected for the unique key when creating lists and similar elements.
        const msec = dateObj.getMilliseconds()
        const newHistory = [...this.state.history, { location:newLocation, day, hour, min, sec, msec }]
        this.setState({ history: newHistory })
    }
    goToNewLocation = (newLocation)=>{
        // all activities needed for a new location.
        this.changeSearchInput(newLocation)
        this.updateHistory(newLocation)
        this.props.changeLocation(newLocation)
    }

    handleSearchFieldChange = (event) => {
      this.changeSearchInput(event.target.value);
    }
    handleSubmit = (event) => {
        this.goToNewLocation(this.state.searchInput)
        event.preventDefault();
    }
    handleRandomClick = (event) => {
        let randInt = Math.floor(Math.random()*this.state.sweetInnCities.length)
        let randCity = this.state.sweetInnCities[randInt]
        this.goToNewLocation(randCity)
    }
    handleHistoryClick = (events) => {
        this.setState((prevState) => ({showHistory: !(prevState.showHistory)}))
    }

    render() {
      return (
        <section className="App-controller">

            <div className="first-row">
              <form onSubmit={this.handleSubmit} className="form-inline">
                  <label className="label-type-1">Search It</label>
                      <input onChange={this.handleSearchFieldChange} className="form-control search-input" type="text" placeholder="Enter City Name" value={this.state.searchInput}/>
                      <input className="btn search-submit" type="submit" />
              </form>
              <button className="btn" onClick={this.handleHistoryClick}>Show History</button>
            </div>

            <div className="second-row">
                  <label className="label-type-1">Or Choose one of SweetInn Cities</label>
                  <SelectCity sweetInnCities={this.state.sweetInnCities} goToNewLocation={this.goToNewLocation} />
                  <button className="btn" onClick={this.handleRandomClick}>Random SweatINN City</button>
            </div>

          {this.state.showHistory? <HistoryDisplay history={this.state.history} goToNewLocation={this.goToNewLocation} /> : "" }

        </section>
      )
    }
}

class SelectCity extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedValue:'A'
        }
    }
    handleChange = (event) => {
        const selectedValue = event.target.value
        this.setState({selectedValue})
        if (selectedValue !== 'A'){
            const cityInt = parseInt(selectedValue)
            const city = this.props.sweetInnCities[cityInt]
            this.props.goToNewLocation(city)
        }
    }
    render (){
        const cityOptions = this.props.sweetInnCities.map((city, i) => <option value={i} key={city}>{city}</option>)
        return (
            <select onChange={this.handleChange} value={this.state.selectedValue} className="custom-select">
                <option value='A'>Select</option>
                {cityOptions}
            </select>
        )
    }
}


class HistoryDisplay extends Component {
    clickHandler = (e) => {
        console.log(e.target.value)
        this.props.goToNewLocation(e.target.textContent)
    }

    render(){
        const historyItems = this.props.history.map( (item) => {
            const min = item.min<10 ? `0${item.min}` : item.min
            return (
                <tr onClick={this.clickHandler} className="history-row" key={item.day+item.hour+item.min +item.sec + item.msec}>
                    <td>{item.day}</td>
                    <td>{item.hour}:{min}</td>
                    <td>
                        {/* <a href='#goToCity' onClick={this.clickHandler}> */}
                            {item.location}
                        {/* </a> */}
                    </td>
                    <td>Flickr.com</td>
                </tr>
        )})
        return (
            <table className='HistoryDisplay'>
                <thead><tr><th>Day</th><th>Hour</th><th>Search Value</th><th>Images From</th></tr></thead>
                <tbody>{historyItems}</tbody>
            </table>
        )
    }
}
