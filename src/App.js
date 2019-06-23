import React, { Component } from 'react';
import SearchBar from './components/searchBar/searchBar';
import CardGroup from './components/cardGroup/cardGroup';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.scss';


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
                    displayed: amiibo.slice(0, 20),
                    start: 20,
                })                
            })
    }

    handleScroll = () => {
        const { start, displayed, searchInput } = this.state;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const arr = searchInput.length === 0 ?
                    Object.values(data.amiibo) :
                    Object.values(data.amiibo).filter(character =>
                        character.name.toLowerCase().includes(searchInput.toLowerCase())
                    )
                this.setState({
                    start: start + 20,
                    displayed: displayed.concat(arr.slice(start, start + 20))
                })
            })
    };

    onSearchChange = (event) => {
        const { start } = this.state;
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
                    displayed: arr.slice(start, start + 20),
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
                    <CardGroup displayed={displayed} />
                </InfiniteScroll>
            </div>
        )
    }
}

export default App;