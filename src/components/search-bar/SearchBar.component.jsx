import React from 'react';
import CustomButton from '../custom-button/cutom-button';

class SearchBar extends React.Component{


    render(){
        return(
        <div className="search-bar-container">
        <input type="text" className="search-bar"/>
        <button className="search-button"><i className="fas fa-search"></i></button>
        </div>
        )
    }
}

export default SearchBar