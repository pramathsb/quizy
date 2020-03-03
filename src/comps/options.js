import React from 'react'

export function SingleOptions (props) {
    return (
        <div className="form-wrap">
            <label className={`btn btn-options ${parseInt(props.selectedAnswers[parseInt(props.qid-1)]) === props.index ? 'selected':''} ${!(parseInt(props.selectedAnswers[parseInt(props.qid-1)]) === props.index) && props.isLocked[(props.qid-1)] ? 'disabled' : ''}`}>
                <input type="radio" checked={parseInt(props.selectedAnswers[parseInt(props.qid-1)]) === props.index} name={props.qid} data-aid={props.data.aid} onChange={(e)=>{props.selectAnwser(e)}} disabled={props.isLocked[(props.qid-1)] ? props.isLocked[(props.qid-1)] : false}/>
                {props.data.ans} <i className="far fa-circle"></i> <i className="far fa-check-circle"></i>
            </label>
        </div>
    )
}

export function MultipleOptions (props) {

    return (
        <div className="form-wrap">
            <label className={`btn btn-options ${(props.selectedAnswers[props.qid-1] ? props.selectedAnswers[props.qid-1].includes(props.index) : false) ? 'selected':''} ${!(props.selectedAnswers[props.qid-1] ? props.selectedAnswers[props.qid-1].includes(props.index) : false) && props.isLocked[(props.qid-1)] ? 'disabled' : ''}`}>
                <input type="checkbox" checked={props.selectedAnswers[props.qid-1] ? props.selectedAnswers[props.qid-1].includes(props.index) : false} name={props.qid} data-aid={props.data.aid}  data-anstype="multiple" onChange={(e)=>{props.selectAnwser(e)}} disabled={props.isLocked[(props.qid-1)] ? props.isLocked[(props.qid-1)] : false}/>
                {props.data.ans} <i className="far fa-circle"></i> <i className="far fa-check-circle"></i>
            </label>
        </div>
    )
}

export default function (props) {
    return (
        props.answers.map((e,i)=>{return (
            props.type !== 'multiple' ?
            <SingleOptions data={e} index={i} key={i} qid={props.qid} selectAnwser={props.selectAnwser} selectedAnswers={props.selectedAnswers} isLocked={props.isLocked}/>
            :
            <MultipleOptions data={e} index={i} key={i} qid={props.qid} selectAnwser={props.selectAnwser} selectedAnswers={props.selectedAnswers} isLocked={props.isLocked}/>
        )})
    )
}