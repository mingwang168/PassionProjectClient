import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import wordsPic from '../English-words-vocabulary.jpg';
import Logo from '../Logo.png';
import WordList from '../components/WordList';
import San from '../components/San.js';
import ModalChangeSchedule from '../components/ModalChangSchedule';

//const API_INVOKE_URL = 'https://ukh2ss7ewl.execute-api.us-east-1.amazonaws.com/prod';
const BASE_URL = 'https://localhost:44316/api';
//const BASE_URL = 'https://memorizewordsapi.azurewebsites.net/api';
class Home extends React.Component {
  state={
    openModalChangeSchedule: false,
    err: "",
    wordNumber:""
  }
  constructor(props) {
    super(props);
    this.state = { learningSchedule: [], loading: true };
    console.log(this.props.auth.user.username);
    fetch(BASE_URL + '/LearningSchedules/' + this.props.auth.user.username )
      .then(response => response.json())
      .then(data => {
        this.setState({ learningSchedule: data, loading: false });
      })
  }

  handlevalidate = () => {
    this.setState(() => {
      return {
        err: 'invalid input!',
        openModalChangeSchedule: true
      }
    });
  }
  handleChangeSchedule = (changeSchedule = true, dayNumber) => {
    this.state.err = ""

    if (changeSchedule) {
      if (parseFloat(dayNumber).toString() == "NaN" || dayNumber == '') {
        this.handlevalidate();
        return;
      }
      this.setState((prevState) => (
        {
          openModalChangeSchedule: !prevState.openModalChangeSchedule
        }
      ));
      let scheduleForPut=this.state.learningSchedule;
      scheduleForPut.wordNumberPerDay=dayNumber;
      scheduleForPut.numberOfDay=Math.ceil(this.state.wordNumber*5/(dayNumber*2));
      scheduleForPut.daysHaveLearned=0;
      this.setState({learningSchedule: scheduleForPut});
      fetch(BASE_URL + '/LearningSchedules?username=' + this.props.auth.user.username ,{
        method: 'POST', // or 'PUT'
        body: JSON.stringify(this.state.learningSchedule), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
    } else {
      this.setState((prevState) => ({ openModalChangeSchedule: !prevState.openModalChangeSchedule }));
    }
  }
  getWordNumber=(wordNumber)=>{
this.state.wordNumber=wordNumber;
  }
  renderSchedule() {
    return (
      <div className="wrap">
        <div className="scheduleBox">
          <p style={{fontSize:22}}>You have learned :</p>
        <San learningSchedule={this.state.learningSchedule}/>
          <div className="learningSchedulebox">
            <span style={{fontSize:15}}>Schedule : <span style={{color:"blue"}}>{this.state.learningSchedule.wordNumberPerDay}/day</span>, <span style={{fontSize:15}}>It is expected to be completed in</span> <span style={{color:"blue"}}>{this.state.learningSchedule.numberOfDay}</span> days</span>
            <span className="btn btn-outline-info btn-sm btnChange" onClick={() => {this.handleChangeSchedule(false) }}>change</span>
          </div>
          <WordList getWordNumber={this.getWordNumber} />
          <span className="sanDaysText">{this.state.learningSchedule.daysHaveLearned}</span>
            {(this.state.learningSchedule.daysHaveLearned) > 1 && <span className="sanDaysDays">days</span>}{(this.state.learningSchedule.daysHaveLearned) <= 1 && <span className="sanDaysDays">day</span>}
        </div>
        <Link to={{pathname:'/learning',state:this.state.learningSchedule}}><button className="btn btn-lg startLearning">Start Learning</button></Link>
      </div>
    );
  }

  render() {
    let contents = this.state.loading || !this.props.auth.isAuth
      ? <div>
        <p><em>Please register and login or login with a default user. (Username: mingwang, Password: P@$$w0rd)</em></p>
        <img className="coverPic" src={wordsPic} alt="english vords" width="380" />
      </div>
      : this.renderSchedule();
    // console.log(this.props.auth.isAuth);
    return (
      <div className="container">
        <img className="logo" src={Logo} alt="the logo"></img>
        {contents}
        <ModalChangeSchedule open={this.state.openModalChangeSchedule} handleChangeSchedule={this.handleChangeSchedule} err={this.state.err} />
      </div>
    );
  }
}
export default Home;