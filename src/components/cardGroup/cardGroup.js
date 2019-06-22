import React, { Component } from 'react';
import StackGrid from "react-stack-grid";
import './cardGroup.scss';


class CardGroup extends Component {

    render() {

        const { displayed } = this.props;

        return (
            <div>
                <StackGrid
                    className='character-card-group'
                    columnWidth={240}
                    gutterWidth={20}
                    gutterHeight={20}
                    duration={0}
                    appearDelay={100}
                >
                    {displayed.map(character =>
                        <div key={character.tail} className='character-card'>
                            <img src={character.image} alt={character.character} />
                            <h3>{character.character}</h3>
                            <div>{`${character.amiiboSeries}`}</div>
                            <div>{`Release : ${character.release.jp}`}</div>
                        </div>
                    )}
                </StackGrid>
            </div>
        )
    }
}

export default CardGroup;