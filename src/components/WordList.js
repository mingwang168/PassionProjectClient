import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

const BASE_URL = 'https://localhost:44316/api';
//const BASE_URL = 'https://memorizewordsapi.azurewebsites.net/api';

class WordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { wordList: '' };
        fetch(BASE_URL + '/WordList/' + this.props.auth.user.username)
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
                    <span style={{fontSize:15}}>Word List : {this.state.wordList.wordListName} </span>
                    <span style={{fontSize:15,color: "blue"}}>({this.state.wordList.wordNumber} words)</span>
                </span>
                <Link to={{pathname:'/changeList',state:this.state.learningSchedule}}>
                <span className="btn btn-outline-info btn-sm btnChange" >change</span>
                </Link>
            </div>
        )
    }
}

export default WordList;