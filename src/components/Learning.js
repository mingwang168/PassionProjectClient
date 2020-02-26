import React, { useState, useEffect } from 'react';
import Logo from '../Logo.png';
import { Link, Redirect } from 'react-router-dom';

const BASE_URL = 'https://localhost:44316/api';

class Learning extends React.Component {

    constructor() {
        super();
        this.state = { words: [], currentWord: '' };
        let i = 4;
        fetch(BASE_URL + '/Words')
            .then(response => response.json())
            .then(data => {

                this.setState({ words: data, currentWord: data[i] });
                console.log(this.state.words[i].englishWord);
            })
    }

    render() {

        return (
            <div className="container">
                <img className="logo" src={Logo} alt="the logo"></img>
                <div className="LearningdBox">
                    <div className="wordBox bg-info">
                        <Link to="/"><button className="goBackbtn">←</button></Link>
                        <p className="theEnglishWord">{this.state.currentWord.englishWord}</p>
                    </div>
                    <div>
                        <p className="chineseMeaning">{this.state.currentWord.chineseMeaning}</p>
                    </div>
                    <p className="phoneticSymbols">{this.state.currentWord.phoneticSymbols}</p>
                    <div className="d-flex justify-content-around">
                        <button className="learningbtnknow btn">know</button>
                        <button className="learningbtnunknow btn">unknow</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Learning;