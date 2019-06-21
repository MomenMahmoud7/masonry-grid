import React, { Component } from 'react'
import { Input } from 'semantic-ui-react';
import './searchBar.scss'


class SearchBar extends Component {
    render() {
        return (
            <div className='container'>
                <div className='search-container'>
                    <Input
                        size='big'
                        transparent
                        icon='search'
                        iconPosition='left'
                        placeholder='Search'
                        onChange={this.props.onSearchChange}
                    />
                </div>
            </div>
        )
    }
}
export default SearchBar;