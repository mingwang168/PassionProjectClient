import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://localhost:44316/api';

class WordList extends React.Component {
    constructor() {
        super();
        this.state = { wordList: '' };
        fetch(BASE_URL + '/WordList/1')
            .then(response => response.json())
            .then(data => {
                this.setState({ wordList: data });
            });
            
    }

    render() {
        this.props.getWordNumber(this.state.wordList.wordNumber);
        return (
            <div className="vocabularyListbox">
                <span>
                    <span style={{fontSize:13}}>Word List : {this.state.wordList.wordListName} </span>
                    <span style={{fontSize:13,color: "blue"}}>({this.state.wordList.wordNumber} words)</span>
                </span>
                <span className="btn btn-outline-info btn-sm btnChange" /* onClick={changeWordList()} */>change</span>
            </div>
        )
    }
}

export default WordList;