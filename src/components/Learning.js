import React, { useState, useEffect } from 'react';
import Logo from '../Logo.png';
import { Link, Redirect } from 'react-router-dom';
import { getElementError } from '@testing-library/react';

const BASE_URL = 'https://localhost:44316/api';
var index=0;
class Learning extends React.Component {

    constructor(props) {
        super();
        this.state = { toLearnWords: [], currentWord: '', isShown: false };

        fetch(BASE_URL + '/Words')
            .then(response => response.json())
            .then(data => {
                var words = [];
                var newWords = [];
                var reviewWords = [];
                var numberPerDay = this.props.location.state.wordNumberPerDay;
                words = data;
                words.forEach(e => {
                    if (e.times == 0) {
                        newWords.push(e);
                    } else {
                        if (!(e.time6 === true && e.time7 === true && e.time8 === true)) reviewWords.push(e)
                    }
                });

                var lenNewWords = newWords.length;

                for (var i = lenNewWords - 1; i >= 0; i--) {
                    var randomIndex = Math.floor(Math.random() * (i + 1));
                    var itemIndex = newWords[randomIndex];
                    newWords[randomIndex] = newWords[i];
                    newWords[i] = itemIndex;
                }

                const newTmpArr = newWords;
                let toLearnNewWords = [];
                if (lenNewWords >= numberPerDay) {
                    for (let i = 0; i < numberPerDay; i++) {
                        toLearnNewWords.push(newTmpArr[i]);
                    };
                } else {
                    for (let i = 0; i < lenNewWords; i++) {
                        toLearnNewWords.push(newTmpArr[i]);
                    };
                }

                var lenReview = reviewWords.length;
                for (var i = lenReview - 1; i >= 0; i--) {
                    var randomIndex = Math.floor(Math.random() * (i + 1));
                    var itemIndex = reviewWords[randomIndex];
                    reviewWords[randomIndex] = reviewWords[i];
                    reviewWords[i] = itemIndex;
                }

                const reviewTmpArr = reviewWords;
                let toLearnReviewWords = [];
                if (lenReview >= numberPerDay) {
                    for (let i = 0; i < numberPerDay; i++) {
                        toLearnReviewWords.push(reviewTmpArr[i]);
                    };
                } else {
                    for (let i = 0; i < lenReview; i++) {
                        toLearnReviewWords.push(reviewTmpArr[i]);
                    };
                }
                console.log(toLearnNewWords);
                console.log(toLearnReviewWords);
                this.setState({ toLearnWords: toLearnNewWords.concat(toLearnReviewWords) });
                console.log(this.state.toLearnWords);
                this.setState({currentWord:this.state.toLearnWords[index]})

            })
    }

    componentDidMount() {
        var theClickArea = document.getElementById('clickableArea');
        theClickArea.addEventListener('mouseup', this.showMeaning);

    }

    showMeaning = () => {
        this.setState({ isShown: true })
    }
    
    sendKnow = (id) => {
        if(index<this.state.toLearnWords.length-1){
        index++;
        this.setState({currentWord:this.state.toLearnWords[index],isShown: false})
    }
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
                    <div id="clickableArea" >
                        {this.state.isShown && <p className="chineseMeaning">{this.state.currentWord.chineseMeaning}</p>}
                        {this.state.isShown && <p className="phoneticSymbols">{this.state.currentWord.phoneticSymbols}</p>}
                    </div>
                    <div className="d-flex justify-content-around">
                        <button className="learningbtnknow btn" onClick={() => { this.sendKnow(this.state.currentWord.wordID) }}>know</button>
                        <button className="learningbtnunknow btn">unknow</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Learning;