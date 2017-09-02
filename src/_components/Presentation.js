import React, { Component } from 'react'
import '../App.css'

export default class Presentation extends Component {

    render (){
        var content
        if (!this.props.destination){
            content=<ul>{this.props.sweetInnCities.map( city => <li>1 pic of {city}</li> )}</ul>
            console.log(`this.props.destination is empty`)
        } else {
            console.log('not empty')
            content = `10 pics of ${this.props.destination}`
        }
        return (
            <section className="Presentation">
                {content}
            </section>
        )
    }
}
