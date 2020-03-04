import React, { useState, useEffect } from 'react';
import Logo from '../Logo.png';
import { Link, Redirect } from 'react-router-dom';
import { getElementError } from '@testing-library/react';

const BASE_URL = 'https://localhost:44316/api';
var index = 0;
var newWordsNumber = 0;
var reviewWordsNumber = 0;
var newWordsHaveLearned = 0;
var reviewWordsHaveLearned = 0;
var beginingTime = '';
var endingTime = '';
class Learning extends React.Component {

    constructor(props) {
        super();
        this.state = { toLearnWords: [], currentWord: '', isShown: false, newPercent: '', reviewPercent: '', redirect: false };
        index = 0;
        newWordsNumber = 0;
        reviewWordsNumber = 0;
        newWordsHaveLearned = 0;
        reviewWordsHaveLearned = 0;
        beginingTime = '';
        endingTime = '';
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
                        if (!(e.time1 === true && e.time2 === true && e.time3 === true) && !(e.time2 === true && e.time3 === true && e.time4 === true) && !(e.time3 === true && e.time4 === true && e.time5 === true) && !(e.time4 === true && e.time5 === true && e.time6 === true) && !(e.time5 === true && e.time6 === true && e.time7 === true) && !(e.time6 === true && e.time7 === true && e.time8 === true)){
                           reviewWords.push(e) 
                        } 
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
                newWordsNumber = toLearnNewWords.length;
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
                reviewWordsNumber = toLearnReviewWords.length;
                console.log(toLearnNewWords);
                console.log(toLearnReviewWords);
                var combinWords = toLearnNewWords.concat(toLearnReviewWords);
                console.log(combinWords);

                var lenCombinWords = combinWords.length;
                for (var i = lenCombinWords - 1; i >= 0; i--) {
                    var randomComIndex = Math.floor(Math.random() * (i + 1));
                    var itemComIndex = combinWords[randomComIndex];
                    combinWords[randomComIndex] = combinWords[i];
                    combinWords[i] = itemComIndex;
                }
                this.setState({ toLearnWords: combinWords});
                this.setState({ currentWord: this.state.toLearnWords[index] })
            })
        beginingTime = new Date();
        //console.log(beginingTime);
    }

    componentDidMount() {
        var theClickArea = document.getElementById('clickableArea');
        theClickArea.addEventListener('mouseup', this.showMeaning);

    }

    showMeaning = () => {
        this.setState({ isShown: true })
    }

    sendKnow = async (word) => {

        if (word.times == 0) {
            newWordsHaveLearned++;
        } else {
            reviewWordsHaveLearned++;
        }
        var wordSet = word;
        wordSet.times++;
        if (wordSet.times === 1) {
            wordSet.time1 = true;
        } else if (wordSet.times === 2) {
            wordSet.time2 = true;
        } else if (wordSet.times === 3) {
            wordSet.time3 = true;
        } else if (wordSet.times === 4) {
            wordSet.time4 = true;
        } else if (wordSet.times === 5) {
            wordSet.time5 = true;
        } else if (wordSet.times === 6) {
            wordSet.time6 = true;
        } else if (wordSet.times === 7) {
            wordSet.time7 = true;
        } else if (wordSet.times === 8) {
            wordSet.time8 = true;
        }
        console.log(wordSet);
        await fetch(BASE_URL + '/Words/' + wordSet.wordID, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wordID: wordSet.wordID,
                englishWord: wordSet.englishWord,
                phoneticSymbols: wordSet.phoneticSymbols,
                chineseMeaning: wordSet.chineseMeaning,
                times: wordSet.times,
                time1: wordSet.time1,
                time2: wordSet.time2,
                time3: wordSet.time3,
                time4: wordSet.time4,
                time5: wordSet.time5,
                time6: wordSet.time6,
                time7: wordSet.time7,
                time8: wordSet.time8,
                wordListID: 1
            })
        })
            // Wait for response.   
            .then(response => response.json())
            // Data retrieved.
            .then(json => {
                //  alert(JSON.stringify(json));
            })
            // Data not retrieved.
            .catch(function (error) {
                //  alert(error);
            })
        if (newWordsNumber !== 0) {
            var percentNew = Math.round((newWordsHaveLearned / newWordsNumber) * 100) + "%";
        } else {
            var percentNew = "100%";
        }
        if (reviewWordsNumber !== 0) {
            var percentReview = Math.round((reviewWordsHaveLearned / reviewWordsNumber) * 100) + "%";
        } else {
            var percentReview = "100%";
        }
        this.setState({ newPercent: percentNew });
        this.setState({ reviewPercent: percentReview });
        if (index < this.state.toLearnWords.length - 1) {
            index++;
            this.setState({ currentWord: this.state.toLearnWords[index], isShown: false });
        } else {
            this.setState({ redirect: true })
        }
    }

    sendUnknow = async (word) => {
        if (word.times == 0) {
            newWordsHaveLearned++;
        } else {
            reviewWordsHaveLearned++;
        }
        var wordSet = word;
        wordSet.times++;
        if (wordSet.times === 1) {
            wordSet.time1 = false;
        } else if (wordSet.times === 2) {
            wordSet.time2 = false;
        } else if (wordSet.times === 3) {
            wordSet.time3 = false;
        } else if (wordSet.times === 4) {
            wordSet.time4 = false;
        } else if (wordSet.times === 5) {
            wordSet.time5 = false;
        } else if (wordSet.times === 6) {
            wordSet.time6 = false;
        } else if (wordSet.times === 7) {
            wordSet.time7 = false;
        } else if (wordSet.times === 8) {
            wordSet.time8 = false;
        }
        console.log(wordSet);
        await fetch(BASE_URL + '/Words/' + wordSet.wordID, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wordID: wordSet.wordID,
                englishWord: wordSet.englishWord,
                phoneticSymbols: wordSet.phoneticSymbols,
                chineseMeaning: wordSet.chineseMeaning,
                times: wordSet.times,
                time1: wordSet.time1,
                time2: wordSet.time2,
                time3: wordSet.time3,
                time4: wordSet.time4,
                time5: wordSet.time5,
                time6: wordSet.time6,
                time7: wordSet.time7,
                time8: wordSet.time8,
                wordListID: 1
            })
        })
            // Wait for response.   
            .then(response => response.json())
            // Data retrieved.
            .then(json => {
                //  alert(JSON.stringify(json));
            })
            // Data not retrieved.
            .catch(function (error) {
                //  alert(error);
            })

        if (newWordsNumber !== 0) {
            var percentNew = Math.round((newWordsHaveLearned / newWordsNumber) * 100) + "%";
        } else {
            var percentNew = "100%";
        }
        if (reviewWordsNumber !== 0) {
            var percentReview = Math.round((reviewWordsHaveLearned / reviewWordsNumber) * 100) + "%";
        } else {
            var percentReview = "100%";
        }
        this.setState({ newPercent: percentNew });
        this.setState({ reviewPercent: percentReview });
        if (index < this.state.toLearnWords.length - 1) {
            index++;
            this.setState({ currentWord: this.state.toLearnWords[index], isShown: false });
        } else {
            this.setState({ redirect: true })
        }
    }
    render() {
        if (this.state.redirect == true) {
            index = 0;
            endingTime = new Date();
            var timeDiff = Math.round((endingTime - beginingTime) / (1000 * 60));
            console.log(timeDiff);
            return <Redirect to={{ pathname: '/result', state: { timeDiff: timeDiff, newWordsLearnedNumber: newWordsHaveLearned, reviewWordsLearnedNumber: reviewWordsHaveLearned } }} />
        }
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
                        <button className="learningbtnknow btn" onClick={() => { this.sendKnow(this.state.currentWord) }}>know</button>
                        <button className="learningbtnunknow btn" onClick={() => { this.sendUnknow(this.state.currentWord) }}>unknow</button>
                    </div>
                </div>
                <div className="progressBox">
                    <p className="progressTittle">Learning progress</p>
                    <div className="progressItem">
                        <p className="progressText">New Words: </p>
                        <div className="progress">
                            <div className="progress-bar" style={{ width: this.state.newPercent }}>{this.state.newPercent}</div>
                        </div>
                    </div>
                    <div className="progressItem">
                        <p className="progressText">Review Words: </p>
                        <div className="progress">
                            <div className="progress-bar  bg-warning" style={{ width: this.state.reviewPercent }}>{this.state.reviewPercent}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Learning;