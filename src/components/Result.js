import React, { useState, useEffect } from 'react';
import Logo from '../Logo.png';
import Clock from '../clock1.png'
import { Link, Redirect } from 'react-router-dom';

const BASE_URL = 'https://localhost:44316/api';
var timeDiff = '';
var newWordsLearnedNumber = '';
var reviewWordsLearnedNumber = '';


class Result extends React.Component {

    constructor(props) {
        var finishedNumber = 0;
        super(props);
        console.log(this.props.location.state);
        timeDiff = (this.props.location.state.timeDiff).toString();
        newWordsLearnedNumber = (this.props.location.state.newWordsLearnedNumber).toString();
        reviewWordsLearnedNumber = (this.props.location.state.reviewWordsLearnedNumber).toString();
        this.state = { learningSchedule: [], loading: true, wordNumber: 0, allDone: false };
        this.renewSchedudle();


        fetch(BASE_URL + '/Words')
            .then(response => response.json())
            .then(data => {
                data.forEach(e => {

                    if ((e.time1 === true && e.time2 === true && e.time3 === true) || (e.time2 === true && e.time3 === true && e.time4 === true) || (e.time3 === true && e.time4 === true && e.time5 === true) || (e.time4 === true && e.time5 === true && e.time6 === true) || (e.time5 === true && e.time6 === true && e.time7 === true) || (e.time6 === true && e.time7 === true && e.time8 === true)) {
                        finishedNumber = finishedNumber + 1;
                        console.log(finishedNumber)
                    }
                });
                console.log(data.length);
                this.setState({ wordNumber: data.length })
                if (finishedNumber === this.state.wordNumber) {
                    this.setState({ allDone: true })
                }
            })
    }
    renewSchedudle = async () => {
        await fetch(BASE_URL + '/LearningSchedules/1')
            .then(response => response.json())
            .then(data => {
                //   console.log(data[0].daysHaveLearned);
                this.setState({ learningSchedule: data, loading: false });
            });

        console.log(this.state.learningSchedule)
        fetch(BASE_URL + '/LearningSchedules/1', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "scheduleID": 1,
                "wordNumberPerDay": this.state.learningSchedule.wordNumberPerDay,
                "numberOfDay": this.state.learningSchedule.numberOfDay,
                "wordListID": this.state.learningSchedule.wordListID,
                "daysHaveLearned": (this.state.learningSchedule.daysHaveLearned + 1)
            })
        })
    }
    render() {

        return (

            <div className="container">
                <img className="logo" src={Logo} alt="the logo"></img>
                <div className="LearningdBox">
                    <img className="rounded mx-auto d-block clock" src={Clock} alt="the clock"></img>
                    {this.state.allDone && <div>
                        <p className="finishAll">
                            congratulation! You have finished the schedule.</p>
                    </div>}
                    <p className="resultText">You have learned <span className="resultNumber">{timeDiff}</span> minutes</p>
                    <p className="resultText">New words have learned : <span className="resultNumber">{newWordsLearnedNumber}</span></p>
                    <p className="resultText">words have reviewed : <span className="resultNumber">{reviewWordsLearnedNumber}</span></p>
                    {!this.state.allDone && <Link to={{ pathname: '/learning', state: this.state.learningSchedule }}><button className="btn btn-lg startLearning">Continue Learning</button></Link>}

                </div>
            </div>
        )
    }
}
export default Result;