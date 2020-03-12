import React, { Component } from 'react';
import './assets/styles/scss/master.scss'

import MainTemplate from './comps/_grid/mainTemplate'
import Timer from './comps/timer';
import QuestionBlock from './comps/questionBlock';
import Result from './comps/result';

let question = require('./services/questions.json')
let answers = require('./services/answers.json')

class app extends Component {

  questionLen = question.length;


  rArr = () => {
    let a = [];
    for (let i=0; i<5; i++) {
      a.push(i)
    }

    return a.sort(function() {return .5 - Math.random();});
  }

  qmap = this.rArr()
  
  timer = 59800;

  state = JSON.parse(localStorage.getItem('state')) || {
  //  state =  { 
    currQid: this.qmap[0],
    vQid: 0,
    quizComplete: false,
    answers: {},
    locked: {},
    buttons: {disableNext:false,disablePrev:true},
    result: {},
    timeleft : Date.now() + (question.length * this.timer),
    showTimer: true
  };

   navigate = (e,way) => {
    let cur = this.state.vQid ;
    let min = 0, max = question.length;

    let updateBtns = () => {
      this.setState({...this.state, buttons: {...this.state.buttons, disablePrev: this.state.vQid === min? true : false, disableNext: this.state.vQid+1 === max ? true : false}})
    }

    if (way === 'next' && cur <= max) {
      this.setState({...this.state, vQid: this.state.vQid+1, currQid: this.qmap[this.state.vQid+1]}, updateBtns);
    }
    
    if (way === 'prev' && cur > min) {
      this.setState({...this.state, vQid: this.state.vQid-1, currQid: this.qmap[this.state.vQid-1]}, updateBtns);
    }

  };

  selectAnwser = (e) => {
    const currQid = this.state.currQid;
    let ans = {...this.state.answers};

    if(!this.state.locked[currQid] && e.target.dataset.anstype!=="multiple") {
      ans[currQid] =  e.target.dataset.aid-1;
      // console.log(ans,currQid,e.target.dataset.aid)
      this.setState({...this.state, answers: ans, result: {...this.state.result, [currQid]:answers[currQid].answer === e.target.dataset.aid-1}}) 
    }
    
    if(!this.state.locked[currQid] && e.target.dataset.anstype==="multiple") {
      ans[currQid]= ans[currQid] || [];

      if(!ans[currQid].includes(e.target.dataset.aid-1) && e.target.checked) {
          ans[currQid].push(e.target.dataset.aid-1);
      }
      
      if(ans[currQid].includes(e.target.dataset.aid-1) && !e.target.checked) {
        if (e.target.dataset.aid-1 > -1) {
          ans[currQid].splice(ans[currQid].indexOf(e.target.dataset.aid-1), 1);
        }
      }

      this.setState({...this.state, answers: ans, result: {...this.state.result, 
        [currQid]: answers[currQid].answer.every((e,i)=>{
          return ans[currQid].includes(e);
        }) && answers[currQid].answer.length === ans[currQid].length
      }})
    }
  }

  lockThis = () => {
    const currQid = this.state.currQid;
    if(question[currQid].type==='single' && this.state.answers[currQid]>=0 && this.state.answers[currQid]!=null && !this.state.locked[currQid]) {
      let locked = this.state.locked;
      locked[currQid] =  true;
      this.setState({...this.state, locked: locked})
    }

    if (question[currQid].type==='multiple') {
      let multipleLength = this.state.answers[currQid] || [];

      if(multipleLength.length>=1 && !this.state.locked[currQid]) {
        let locked = this.state.locked;
        locked[currQid] =  true;
        this.setState({...this.state, locked: locked})
      }
    }

    // Check Result 

    if (Object.keys(this.state.result).length=== question.length && Object.keys(this.state.locked).length === question.length) {
      this.setState({...this.state, quizComplete: true})
    }
  }

  showResult = () => {
    // console.log('triggered')
    this.setState({...this.state, quizComplete: true})
  }

  handleReset = () => {
    this.setState({
        currQid: 0,
        quizComplete: false,
        answers: {},
        locked: {},
        buttons: {disableNext:false,disablePrev:false},
        result: {},
        timeleft : Date.now() + (question.length * this.timer),
        showTimer: true
      })
  }

  handleClear = () => {
    const currQid = this.state.currQid;
    //if(this.state.locked[currQid]) {
      this.setState({...this.state, 
        answers: {...this.state.answers, [currQid]:null},
        locked: {...this.state.locked, [currQid]:false}
      })
    //}
  }

   render() {
     let  currQuestion = question[this.state.currQid];
     
      return (
          <MainTemplate>
            {!this.state.quizComplete ? <Timer showResult={this.showResult} timer={this.state.timeleft}  showTimer={this.state.showTimer}/> : undefined}
            {!this.state.quizComplete ? 
              <QuestionBlock 
                qmap={this.qmap}
                currQuestion={currQuestion}
                answers={this.state.answers}
                navigate={this.navigate}
                buttonsState={this.state.buttons}
                selectAnwser={this.selectAnwser}
                clear={this.handleClear}
                lockThis={this.lockThis}
                isLocked={this.state.locked}
                vQid={this.state.vQid}
              /> 
              : <Result reset={this.handleReset} result={this.state.result} question={question.length}/>}
          </MainTemplate>
      );
  }

  componentDidUpdate () {
    // console.log('updated')
    //localStorage.setItem('state', JSON.stringify({...this.state}));
  }
}

export default app