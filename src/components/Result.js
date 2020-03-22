import React, { useState, useEffect } from 'react';
import Logo from '../Logo.png';
import Clock from '../clock1.png'
import { Link, Redirect } from 'react-router-dom';

//const BASE_URL = 'https://localhost:44316/api';
const BASE_URL = 'https://memorizewordsapi.azurewebsites.net/api';

var timeDiff = '';
var newWordsLearnedNumber = '';
var reviewWordsLearnedNumber = '';
var words=[];

class Result extends React.Component {

    constructor(props) {
        var finishedNumber = 0;
        super(props);
      //  console.log(this.props.location.state);
        timeDiff = (this.props.location.state.timeDiff).toString();
        newWordsLearnedNumber = (this.props.location.state.newWordsLearnedNumber).toString();
        reviewWordsLearnedNumber = (this.props.location.state.reviewWordsLearnedNumber).toString();
        this.state = { learningSchedule: [], loading: true, wordNumber: 0, allDone: false,redirect:false};
        this.renewSchedudle();


        fetch(BASE_URL + '/Words/' + this.props.auth.user.username)
            .then(response => response.json())
            .then(data => {
                data.forEach(e => {
                    if ((e.time1 === true && e.time2 === true && e.time3 === true) || (e.time2 === true && e.time3 === true && e.time4 === true) || (e.time3 === true && e.time4 === true && e.time5 === true) || (e.time4 === true && e.time5 === true && e.time6 === true) || (e.time5 === true && e.time6 === true && e.time7 === true) || (e.time6 === true && e.time7 === true && e.time8 === true) || (e.times >= 8)) {
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
        await fetch(BASE_URL + '/LearningSchedules/' + this.props.auth.user.username)
            .then(response => response.json())
            .then(data => {
                //   console.log(data[0].daysHaveLearned);
                this.setState({ learningSchedule: data, loading: false });
            });

       // console.log(this.state.learningSchedule)
        fetch(BASE_URL + '/LearningSchedules/' + this.props.auth.user.username, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "scheduleID": this.state.learningSchedule.scheduleID,
                "wordNumberPerDay": this.state.learningSchedule.wordNumberPerDay,
                "numberOfDay": this.state.learningSchedule.numberOfDay,
                "wordListID": this.state.learningSchedule.wordListID,
                "daysHaveLearned": (this.state.learningSchedule.daysHaveLearned + 1),
                "userName": this.props.auth.user.username
            })
        })
    }

    renewWords=async()=>{
        await fetch(BASE_URL + '/Words/' + this.props.auth.user.username)
        .then(response => response.json())
        .then(data => {
            words=data;
        })
        words.forEach(e=>{
            fetch(BASE_URL + '/Words/' + e.wordID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    wordID: e.wordID,
                    englishWord: e.englishWord,
                    phoneticSymbols: e.phoneticSymbols,
                    chineseMeaning: e.chineseMeaning,
                    times: 0,
                    time1: 0,
                    time2: 0,
                    time3: 0,
                    time4: 0,
                    time5: 0,
                    time6: 0,
                    time7: 0,
                    time8: 0,
                    wordListID: 1,
                    userName: this.props.auth.user.username
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
        })
        await fetch(BASE_URL + '/LearningSchedules/' + this.props.auth.user.username)
            .then(response => response.json())
            .then(data => {
                //   console.log(data[0].daysHaveLearned);
                this.setState({ learningSchedule: data});
            });

        console.log(this.state.learningSchedule)
        await fetch(BASE_URL + '/LearningSchedules/' + this.props.auth.user.username, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "scheduleID": this.state.learningSchedule.scheduleID,
                "wordNumberPerDay": this.state.learningSchedule.wordNumberPerDay,
                "numberOfDay": this.state.learningSchedule.numberOfDay,
                "wordListID": this.state.learningSchedule.wordListID,
                "daysHaveLearned": 0,
                "userName": this.props.auth.user.username
            })
        })
        this.setState({redirect:true});
    }
    render() {
        if (this.state.redirect == true) {
            return <Redirect to={{ pathname: '/learning', state: this.state.learningSchedule }}/>
        }
        return (

            <div className="container">
                <img className="logo" src={Logo} alt="the logo"></img>
                <div className="LearningdBox">
                    <img className="rounded mx-auto d-block clock" src={Clock} alt="the clock"></img>
                    <p className="resultText">This time, you have learned <span className="resultNumber">{timeDiff}</span> minutes</p>
                    <p className="resultText">New words have learned : <span className="resultNumber">{newWordsLearnedNumber}</span></p>
                    <p className="resultText">words have reviewed : <span className="resultNumber">{reviewWordsLearnedNumber}</span></p>
                    {!this.state.allDone && <Link to={{ pathname: '/learning', state: this.state.learningSchedule }}><button className="btn btn-lg startLearning">Continue Learning</button></Link>}
                    {this.state.allDone && <div>
                        <p className="finishAll">Congratulation! You have finished the list.</p>
                        <button className="btn btn-lg startLearning" onClick={() => { this.renewWords() }}>Relearn</button>
                    </div>}
                </div>
            </div>
        )
    }
}
export default Result;