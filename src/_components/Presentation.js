import React, { Component } from 'react'
import '../App.css'

export default class Presentation extends Component {


    render (){

        let content1 = (
            <div className="img-presentation">
                {this.props.imgURLs.map( (url) => (
                    // <div className="img-w" key={url}>
                        <img src={url} alt={this.props.destination} />
                    //  </div>
                )
                )}
            </div>
        )

        let content2
        if (!this.props.imgURLs){
            content2=<ul>{this.props.sweetInnCities.map( city => <li>1 pic of {city}</li> )}</ul>
            console.log(`this.props.imgURLs is empty`)
        } else {
            content2 = (
                <div className="carousel carousel-main" data-flickity='{"pageDots": false }'>
    {/* while( have_rows('product_images') ) {
        the_row();
        $image_array = get_sub_field('image');
        $imgURL = $image_array['sizes']['large']; */}
                    {this.props.imgURLs.map( (url) => (
                        <div key={url} className="carousel-cell">
                            <img src={url} alt={this.props.destination} />
                        </div>
                    )
                    )}
                </div>
            )
        }
        return (
            <section className="Presentation">
                {content1}
                {content2}
            </section>
        )
    }
}
