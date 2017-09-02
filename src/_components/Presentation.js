import React, { Component } from 'react'
import '../App.css'

export default class Presentation extends Component {


    render (){
        var content
        if (!this.props.imgURLs){
            content=<ul>{this.props.sweetInnCities.map( city => <li>1 pic of {city}</li> )}</ul>
            console.log(`this.props.imgURLs is empty`)
        } else {
            content = (
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
                {content}
            </section>
        )
    }
}
