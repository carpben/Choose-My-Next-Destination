import React from 'react'
import '../App.css'
import globeLogo from './globe.svg'

export default function Header(){
    return (
        <div className="App-header">
            <img src={globeLogo} className="App-logo" alt="logo" />
          <h2>Choose My Next Destination</h2>
        </div>
    )
}
