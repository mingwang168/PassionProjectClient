import React from 'react';
import Logo from '../Logo.png';
import { Link } from 'react-router-dom';
import $ from 'jquery'
const BASE_URL = 'https://localhost:44316/api';
//const BASE_URL = 'https://memorizewordsapi.azurewebsites.net/api';

class ChangeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordListName: '',
            saveProgress: '',
            learningSchedule: [],
            wordListLen:0
        }
    }

    changeList = async(e) => {
        e.preventDefault();
        const wordListNameInput = e.target.elements.wordListNameInput.value;
        var objFile = document.getElementById("fileId");
        if (objFile.value == "") {
            alert("cannot be empty")
        }
        var files = $('#fileId').prop('files'); //获取到文件列表
        if (files.length == 0) {
            alert('please select a file');
        } else {
            var reader = new FileReader(); //新建一个FileReader
            reader.onload = async (evt) => { //读取完文件之后会回来这里
                var fileString = evt.target.result; // 读取文件内容
                var wordsRows = fileString.split("\n");
                console.log(wordsRows);
                var filteredWordsRows = wordsRows.filter(function (s) {
                    return s && s.trim();
                })
                this.setState({wordListLen:filteredWordsRows.length});
               await fetch(BASE_URL + '/WordList/1', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "wordListID": 1,
                        "wordListName": wordListNameInput,
                        "wordNumber": filteredWordsRows.length
                    })
                })
                await fetch(BASE_URL + '/Words', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                })
                var index = 0;
                filteredWordsRows.forEach(r => {
                    index++;
                    var progress = Math.round((index / filteredWordsRows.length) * 100) + "%";
                    
                    console.log(this.state.saveProgress)
                    setTimeout(()=>{this.setState({ saveProgress: progress });}, 1000)
                    var word = r.split(",");
                    fetch(BASE_URL + '/Words', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            wordID: index,
                            englishWord: word[0],
                            phoneticSymbols: word[1],
                            chineseMeaning: word[2],
                            times: 0,
                            time1: 0,
                            time2: 0,
                            time3: 0,
                            time4: 0,
                            time5: 0,
                            time6: 0,
                            time7: 0,
                            time8: 0,
                            wordListID: 1
                        })
                    })
                })
                // alert("done")
            };
            reader.readAsText(files[0], "UTF-8"); //读取文件
        }

        await fetch(BASE_URL + '/LearningSchedules/' + this.props.auth.user.username )
        .then(response => response.json())
        .then(data => {
          //   console.log(data[0].daysHaveLearned);
          this.setState({ learningSchedule: data});
        })
        this.state.learningSchedule.numberOfDay = Math.ceil(this.state.wordListLen*5/(this.state.learningSchedule.wordNumberPerDay*2));

        fetch(BASE_URL + '/LearningSchedules/' + this.props.auth.user.username , {
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

    }

    render() {
        return (
            <div className="container">
                <img className="logo" src={Logo} alt="the logo"></img>
                <div className="LearningdBox">
                    <Link to="/"><button className="goBackbtn">←</button></Link>
                    <form className="changeWordListForm " onSubmit={this.changeList}>
                        <label className="wordListLabel font-weight-bold">Word list Name: </label>
                        <input className="wordListNameInput form-control" name="wordListNameInput" placeholder="word list name" required></input>
                        <p className="fileFormat font-weight-bold">Upload word list file (.TXT)</p>
                        <input type="file" className="chooseFile" name="file" multiple id="fileId" accept="text/plain" /><br />
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: this.state.saveProgress }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">{this.state.saveProgress}</div>
                        </div>
                        <button type="submit" className="wordListSubmit btn btn-info" name="btn" value="提交" id="btnId" >Submit</button>
                    </form>
                </div>
                
            </div>
        )
    }
}
export default ChangeList;