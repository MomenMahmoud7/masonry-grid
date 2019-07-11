import React, { Component, lazy, Suspense } from 'react';
import SearchBar from './components/searchBar/searchBar';
import { Loader, Icon, Message } from 'semantic-ui-react';
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
            error: null,
        }
    }
    // componentDidMount() {
    //     const here = this;
    //     fetch('https://www.amiiboapi.com/api/amiibo/')
    //         .then(response => response.json())
    //         .then(data => {
    //             here.setState({
    //                 start: 20,
    //             });
    //             const amiibo = Object.values(data.amiibo);

    //             amiibo.slice(0, 20).map(character => {
    //                 var img = new Image();
    //                 img.src = character.image;
    //                 img.addEventListener("load", function () {
    //                     let width = this.naturalWidth;
    //                     let height = this.naturalHeight;
    //                     here.setState({
    //                         displayed: [...here.state.displayed, { ...character, width: width, height: height }]
    //                     })
    //                 });
    //             })
    //         })
    // }
    componentDidMount() {
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const amiibo = Object.values(data.amiibo).slice(0, 20)
                this.setState({
                    displayed: amiibo,
                    start: 20,
                })
            })
            .catch(error => this.setState({ error: error }))
    }

    // handleScroll = () => {
    //     const here = this;
    //     const { start } = here.state;
    //     fetch('https://www.amiiboapi.com/api/amiibo/')
    //         .then(response => response.json())
    //         .then(data => {
    //             here.setState({
    //                 start: start + 4,
    //             })
    //             const amiibo = Object.values(data.amiibo).slice(start, start + 4)
    //             amiibo.map(character => {
    //                 var img = new Image();
    //                 img.src = character.image;
    //                 img.addEventListener("load", function () {
    //                     let width = this.naturalWidth;
    //                     let height = this.naturalHeight;
    //                     here.setState({
    //                         displayed: [...here.state.displayed, { ...character, width: width, height: height }]
    //                     })
    //                 });

    //             })
    //         })
    // };

    handleScroll = () => {
        const { start, displayed } = this.state;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const amiibo = Object.values(data.amiibo).slice(start, start + 10)
                this.setState({
                    start: start + 10,
                    displayed: [...displayed, ...amiibo]
                })
            })
            .catch(error => this.setState({ error: error }))
    };

    onSearchChange = (event) => {
        const text = event.target.value;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const all = Object.values(data.amiibo)
                const amiibo = all.filter(character => 
                    character.name.toLowerCase().includes(text.toLowerCase())
                ).slice(0, 20)
                this.setState({
                    start: 20,
                    displayed: amiibo,
                    searchInput: text
                })
            })
            .catch(error => this.setState({ error: error }))
    }

    handleScrollSearch = () => {
        const { start, displayed, searchInput } = this.state;
        fetch('https://www.amiiboapi.com/api/amiibo/')
            .then(response => response.json())
            .then(data => {
                const amiibo =
                    Object.values(data.amiibo).filter(character =>
                        character.name.toLowerCase().includes(searchInput.toLowerCase())
                    ).slice(start, start + 10)
                this.setState({
                    start: start + 10,
                    displayed: [...displayed, ...amiibo]
                })
            })
            .catch(error => this.setState({ error: error }))
    };

    render() {

        const { displayed, searchInput, error } = this.state;

        return (
            <div className="App">
                {error ?
                    <Message error size='massive'>
                        <Icon name='frown outline' size='huge' />
                        <h1>Oops! Something went wrong!</h1>
                    </Message> :
                    <div>
                        <SearchBar onSearchChange={this.onSearchChange} />
                        <InfiniteScroll
                            className='cards-container'
                            scrollThreshold={0.6}
                            dataLength={displayed.length}
                            next={searchInput.length === 0 ? this.handleScroll : this.handleScrollSearch}
                            hasMore={true}
                        >
                            <Suspense fallback={
                                <Loader active>Preparing Files</Loader>
                            }>
                                <CardGroup displayed={displayed} />
                            </Suspense>
                        </InfiniteScroll>
                    </div>}
            </div>
        )
    }
}

export default App;