import React, { Component } from 'react';
import SearchBar from './components/searchBar/searchBar';
import CardGroup from './components/cardGroup/cardGroup';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from 'semantic-ui-react';
import './App.scss';

class App extends Component {

    constructor() {
        super();
        this.state = {
            displayed: [],
            count: 20,
            start: 0,
            searchInput: '',
        }
    }

    componentDidMount() {
        const { count, start } = this.state;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data =>
                this.setState({
                    displayed: Object.values(data.amiibo).slice(start, count)
                })
            )
    }

    handleScroll = () => {
        const { count, displayed, searchInput } = this.state;
        const newStart = count;
        const newCount = 20 + count;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const arr = searchInput.length === 0 ?
                    Object.values(data.amiibo) :
                    Object.values(data.amiibo).filter(character =>
                        character.character.toLowerCase().includes(searchInput.toLowerCase())
                    )
                this.setState({
                    start: newStart,
                    count: newCount,
                    displayed: displayed.concat(Object.values(arr).slice(newStart, newCount))
                })
            })
    };

    onSearchChange = (event) => {
        const { count, start } = this.state;
        let text = event.target.value;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const arr = text.length === 0 ?
                    Object.values(data.amiibo) :
                    Object.values(data.amiibo).filter(character =>
                        character.character.toLowerCase().includes(text.toLowerCase())
                    )
                this.setState({
                    start: 0,
                    count: 20,
                    displayed: arr.slice(start, count),
                    searchInput: text

                })
            })
    }

    render() {

        const { displayed } = this.state;

        return (
            <div className="App">
                <SearchBar onSearchChange={this.onSearchChange} />
                <InfiniteScroll
                    scrollThreshold={0.7}
                    dataLength={displayed.length}
                    next={this.handleScroll}
                    hasMore={true}
                >
                    {displayed.length === 0 ?
                        <Loader active>Preparing Files</Loader> :
                        <CardGroup displayed={displayed} />
                    }
                </InfiniteScroll>
            </div>
        )
    }
}

export default App;