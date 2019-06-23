import React, { Component, lazy, Suspense } from 'react';
import SearchBar from './components/searchBar/searchBar';
import { Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.scss';

const CardGroup = lazy(() => import('./components/cardGroup/cardGroup'));

class App extends Component {

    constructor() {
        super();
        this.state = {
            displayed: [],
            start: 0,
            searchInput: '',
        }
    }
    componentDidMount() {
        const here = this;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                here.setState({
                    start: 20,
                });
                const amiibo = Object.values(data.amiibo);

                amiibo.slice(0, 20).map(character => {
                    var img = new Image();
                    img.src = character.image;
                    img.addEventListener("load", function () {
                        let width = this.naturalWidth;
                        let height = this.naturalHeight;
                        here.setState({
                            displayed: [...here.state.displayed, { ...character, width: width, height: height }]
                        })
                    });
                })
            })
    }
    // componentDidMount() {
    //     fetch('https://www.amiiboapi.com/api/amiibo/')
    //         .then(response => response.json())
    //         .then(data => {
    //             const amiibo = Object.values(data.amiibo)
    //             this.setState({
    //                 displayed: amiibo.slice(0, 40),
    //                 start: 40,
    //             })
    //         })
    // }

    handleScroll = () => {
        const here = this;
        const { start } = here.state;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                here.setState({
                    start: start + 4,
                })
                const amiibo = Object.values(data.amiibo).slice(start, start + 4)
                amiibo.map(character => {
                    var img = new Image();
                    img.src = character.image;
                    img.addEventListener("load", function () {
                        let width = this.naturalWidth;
                        let height = this.naturalHeight;
                        here.setState({
                            displayed: [...here.state.displayed, { ...character, width: width, height: height }]
                        })
                    });

                })
            })
    };

    // handleScroll = () => {
    //     const { start, displayed } = this.state;
    //     fetch('https://www.amiiboapi.com/api/amiibo/')
    //         .then(response => response.json())
    //         .then(data => {
    //             const amiibo = Object.values(data.amiibo)
    //             this.setState({
    //                 start: start + 5,
    //                 displayed: displayed.concat(amiibo.slice(start, start + 5))
    //             })
    //         })
    // };

    onSearchChange = (event) => {
        const text = event.target.value;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                let amiibo =
                    Object.values(data.amiibo).filter(character =>
                        character.name.toLowerCase().includes(text.toLowerCase())
                    )
                this.setState({
                    start: 0,
                    displayed: amiibo,
                    searchInput: text
                })
            })
    }

    render() {

        const { displayed, searchInput } = this.state;

        return (
            <div className="App">
                <SearchBar onSearchChange={this.onSearchChange} />
                <InfiniteScroll
                    scrollThreshold={0.5}
                    dataLength={displayed.length}
                    next={searchInput.length === 0 ? this.handleScroll : null}
                    hasMore={true}
                >
                    <Suspense
                        fallback={
                            <Loader active>Preparing Files</Loader>
                        }
                    >
                        <CardGroup displayed={displayed} />
                    </Suspense>
                </InfiniteScroll>
            </div>
        )
    }
}

export default App;