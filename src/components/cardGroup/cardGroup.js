import React, { Component } from 'react';
import './cardGroup.scss'

class CardGroup extends Component {
    render() {
        const { amiibo, searchInput } = this.props;
        const arr = searchInput === '' ?
            amiibo :
            amiibo.filter(character =>
                character.name.toLowerCase().includes(searchInput.toLowerCase()))
        return (
            <div className='character-card-group'>
                {arr.map(character =>
                    <div key={character.tail} className='character-card'>
                        <img src={character.image} alt={character.character}/>
                        <h3>{character.character}</h3>
                        <div>{`${character.amiiboSeries}`}</div>
                        <div>{`Release Date:  ${character.release.jp}`}</div>
                    </div>
                )}
            </div>
        )
    }

}

export default CardGroup;