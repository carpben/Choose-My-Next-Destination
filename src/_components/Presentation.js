import React, { Component } from 'react'
import '../App.css'

export default class Presentation extends Component {


    render (){
        var content
        if (!this.props.imgURLs){
            content=<ul>{this.props.sweetInnCities.map( city => <li>1 pic of {city}</li> )}</ul>
            console.log(`this.props.imgURLs is empty`)
        } else {
            console.log('not empty')
        }
        return (
            <section className="Presentation">
            </section>
        )
    }
}
