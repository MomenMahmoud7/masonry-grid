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
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const amiibo = Object.values(data.amiibo)
                this.setState({
                    displayed: amiibo.slice(0, 40),
                    start: 40,
                })
            })
    }

    handleScroll = () => {
        const { start, displayed } = this.state;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const amiibo = Object.values(data.amiibo)
                this.setState({
                    start: start + 5,
                    displayed: displayed.concat(amiibo.slice(start, start + 5))
                })
            })
    };

    onSearchChange = (event) => {
        const text = event.target.value;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const amiibo = 
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
                    scrollThreshold={0.7}
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