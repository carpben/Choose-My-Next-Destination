import React, { Component } from 'react'
import '../App.css'

const MostPopularCities = ["Bangkok, Thailand", "London, UK", "Paris, France", "Dubai, UAE", "New York, NY", "Singapore", "Kuala Lumpur, Malaysia", "Istanbul, Turkey", "Istanbul, Turkey", "Tokyo, Japan", "Seoul, South Korea"]

export default class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            showHistory: false,
      };
    }

    changeSearchInput = (newSearchInput)=>{
        // Controls the value of the search input.
        this.setState ({
            searchInput:newSearchInput,
        })
    }

    goToNewLocation = (newLocation)=>{
        // all activities needed for a new location.
        this.changeSearchInput(newLocation)
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
        let randInt = Math.floor(Math.random()*MostPopularCities.length)
        let randCity = MostPopularCities[randInt]
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
                  <label className="label-type-1">Or Choose a popular city</label>
                  <SelectCity goToNewLocation={this.goToNewLocation} />
                  <button className="btn" onClick={this.handleRandomClick}>Random  City</button>
            </div>

          {this.state.showHistory? <HistoryDisplay clearHistory={this.props.clearHistory} history={this.props.history} goToNewLocation={this.goToNewLocation} /> : "" }

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
            const cityInt = parseInt(selectedValue, 10)
            const city = MostPopularCities[cityInt]
            this.props.goToNewLocation(city)
        }
    }
    render (){
        const cityOptions = MostPopularCities.map((city, i) => <option value={i} key={city}>{city}</option>)
        return (
            <select onChange={this.handleChange} value={this.state.selectedValue} className="custom-select">
                <option value='A'>Select</option>
                {cityOptions}
            </select>
        )
    }
}


class HistoryDisplay extends Component {
    clickHandler = (value) => {
        console.log(value)
        this.props.goToNewLocation(value)
    }

    render(){
        const clearHistoryButton = <button onClick={this.props.clearHistory} type="button" className="btn btn-link clear-history-btn">Clear</button>
        const header = <div><h4>Search History</h4>{clearHistoryButton}</div>
        const historyItems = this.props.history.map( (item) => {
            const min = item.min<10 ? `0${item.min}` : item.min
            return (
                <tr onClick={ () => this.props.goToNewLocation(item.location) } className="history-row" key={item.day+item.hour+item.min +item.sec + item.msec}>
                    <td>{item.day}</td>
                    <td>{item.hour}:{min}</td>
                    <td>{item.location}</td>
                    <td>Flickr.com</td>
                    <td>{item.views}</td>
                </tr>
        )})
        return (
            <div className='HistoryDisplay'>
                {header}
                <table>
                    <thead><tr><th>Day</th><th>Hour</th><th>Search Value</th><th>Images From</th><th>Views</th></tr></thead>
                    <tbody>
                        {historyItems}
                    </tbody>
                </table>
            </div>

        )
    }
}
