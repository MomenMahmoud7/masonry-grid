import React, { Component } from 'react';

class Image extends Component {

    render() {

        const { character } = this.props

        return (
            <img src={character.image} alt={character.character}/>
        )
    }
}
export default Image;