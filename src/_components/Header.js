import React from 'react'
import '../App.css'
import globeLogo from './globe.svg'

export default function Header(){
    return (
        <div className="App-header">
            <img src={globeLogo} className="App-logo" alt="logo" />
          <h1>Choose My Next Destination</h1>
          <h2>Now or later</h2>
        </div>
    )
}
