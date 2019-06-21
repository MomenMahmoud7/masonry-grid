import React, { Component } from 'react';
import SearchBar from './components/searchBar/searchBar';
import CardGroup from './components/cardGroup/cardGroup';
import { Loader } from 'semantic-ui-react';


class App extends Component {

    constructor() {
        super();
        this.state = {
            amiibo: [],
            searchInput: '',
        }
    }

    componentDidMount() {
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => this.setState({ amiibo: Object.values(data.amiibo) }))
    }
    onSearchChange = (event) => {
        this.setState({ searchInput: event.target.value })
    }

    render() {

        const { amiibo, searchInput } = this.state;

        return (
            <div className="App">
                {amiibo.length === 0 ?
                    <Loader active>Preparing Files</Loader> :
                    <CardGroup amiibo={amiibo} searchInput={searchInput} />
                }
                <SearchBar onSearchChange={this.onSearchChange} />
            </div>
        )
    }
}

export default App;