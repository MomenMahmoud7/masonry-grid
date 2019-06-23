import React, { Component, lazy, Suspense } from 'react';
import StackGrid from "react-stack-grid";
import { Placeholder } from 'semantic-ui-react';
import './cardGroup.scss';


const Image = lazy(() => import('../../components/image/image'));


class CardGroup extends Component {

    render() {

        const { displayed } = this.props;

        return (
            <div>
                <StackGrid
                    columnWidth={240}
                    duration={0}
                    appearDelay={0}
                >
                    {displayed.map(character => {
                        // let newHeight = (character.height * 220) / character.width
                        return (
                            <div key={character.tail} className='character-card'>
                                <Suspense
                                    fallback={
                                        <Placeholder fluid>
                                            <Placeholder.Image
                                                // style={{
                                                //     width: `220px`,
                                                //     height: `${newHeight}px`,
                                                // }}
                                            />
                                        </Placeholder>
                                    }
                                >
                                    <Image character={character} />
                                </Suspense>
                                <h3>{character.character}</h3>
                                <div>{`${character.amiiboSeries}`}</div>
                                <div>{`Release : ${character.release.jp}`}</div>
                            </div>)
                    })}
                </StackGrid>
            </div>
        )
    }
}

export default CardGroup;