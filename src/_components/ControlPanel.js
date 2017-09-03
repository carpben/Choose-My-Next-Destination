import React, { Component } from 'react'
import '../App.css'


export default class ControlPanel extends Component {
    constructor(props) {
      super(props);
      this.state = {
          searchInput: '',
          showHistory: false,
          history: [],
          test:""
      };
    }

    changeSearchInput = (newSearchInput)=>{
        console.log(`changeSearchInput started with ${newSearchInput}`)
        this.setState ({
            searchInput:newSearchInput,
            test:newSearchInput
        })
    }
    go = (newLocation)=>{
        console.log(`go started ${newLocation}`)
        // this.changeSearchInput(newLocation)
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const dateObj = new Date()
        const dayInt = dateObj.getDay()
        const day = days[dayInt]
        const hour = dateObj.getHours()
        const min = dateObj.getMinutes()
        const sec = dateObj.getSeconds() //seconds and milsecs are collected for the unique key when creating lists and similar elements.
        const msec = dateObj.getMilliseconds()
        const newHistory = [...this.state.history, { location:newLocation, day, hour, min, sec, msec }]

        this.props.changeLocationToPresent(newLocation)
        this.setState({ history: newHistory })
        console.log(newHistory)
    }
    changeAndGo = (newSearchInput) => {
        this.changeSearchInput(newSearchInput)
        this.go(newSearchInput)
    }
    handleSearchFieldChange = (event) => {
      this.changeSearchInput(event.target.value);
      console.log(`handleSearchFieldChange called ${this.state.searchInput}`)
    }
    handleSubmit = (event) => {
        console.log('submit pressed')
        console.log(this.state.searchInput)
            this.go(this.state.searchInput)
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
    }

    render() {
      return (
        <section className="App-controller">

            <div className="first-row">
              <form onSubmit={this.handleSubmit} className="form-inline">
                  {/* <div className="form-div"> */}
                  <label className="label-type-1">Search It</label>
                      <input onChange={this.handleSearchFieldChange} className="form-control search-input" type="text" placeholder="Enter City Name" value={this.state.searchInput}/>
                      <input className="btn search-submit" type="submit" />
                  {/* </div> */}
              </form>
              <button className="btn" onClick={this.handleHistoryClick}>Show History</button>
            </div>

            <div className="second-row">
                  <label className="label-type-1">Or Choose one of SweetInn Cities</label>
                  <SelectCity sweetInnCities={this.props.sweetInnCities} changeAndGo={this.changeAndGo} />
                  <button className="btn" onClick={this.handleRandomClick}>Random SweatINN City</button>
            </div>

          {this.state.showHistory? <HistoryDisplay history={this.state.history} changeAndGo={this.changeAndGo} /> : <div /> }

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
            console.log('selected')
            console.log(selectedValue)
            console.log(typeof(selectedValue))
            if (selectedValue != 'A'){
                console.log('if executes')
                const cityInt = parseInt(selectedValue)
                const city = this.props.sweetInnCities[cityInt]
                this.props.changeAndGo(city)
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
        this.props.changeAndGo(e.target.textContent)
    }

    render(){
        console.log(this.props.history)
        const historyItems = this.props.history.map( (historicSearch) => {
            const min = historicSearch.min<10 ? `0${historicSearch.min}` : historicSearch.min
            return <tr key={historicSearch.day+historicSearch.hour+historicSearch.min +historicSearch.sec + historicSearch.msec}><td>{historicSearch.day}</td><td>{historicSearch.hour}:{min}</td><td><a href='#goToCity' onClick={this.clickHandler}>{historicSearch.location}</a></td></tr>
        })
        return (
            <table className='HistoryDisplay'>
                <thead><tr><th>Day</th><th>Hour</th><th>Search Value</th></tr></thead>
                <tbody>{historyItems}</tbody>
            </table>
        )
    }
}
