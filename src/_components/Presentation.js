import React, { Component } from 'react'
import '../App.css'

export default class Presentation extends Component {

    render (){

        const header = <h2><small>Check Out</small> {this.props.locationToPresent}</h2>

        let limit = this.props.presentationLoadCycles * 9
        limit = (this.props.imgURLs.length<limit)? this.props.imgURLs.length : limit
        console.log(limit)

        const imgURLsToPresent = this.props.imgURLs.filter( (url, key) => {
            console.log(url)
            console.log(key)
            console.log(limit)
            return key<limit
        })


        let content1 = (
            <div className="img-presentation">
                {imgURLsToPresent.map( (url) => (
                    // <div className="img-w" key={url}>
                        <img src={url} alt={this.props.destination} />
                    //  </div>
                )
                )}
            </div>
        )

        return (
            <section className="Presentation">
                {header}
                {content1}
                <h4><a href="#load more" onClick={this.props.incrementPresentationLoadCycles}>Load More</a></h4>
            </section>
        )
    }
}
