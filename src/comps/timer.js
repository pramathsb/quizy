import React from 'react';
import Countdown from 'react-countdown-now';


export default function (props) {

    function precisionCorrect(time) {
       return time.toString().length < 2 ? `0${time}` : time;
    }

    let comp = props.showTimer

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {

        if (completed) {
            comp = false;
        } 


        if (!comp) {
            return <span>Timeout</span>;
        } else {
            return <span>{precisionCorrect(hours)}:{precisionCorrect(minutes)}:{precisionCorrect(seconds)}</span>;
        }
    };

    const completed = ({completed}) => {
        if(!comp)
        props.showResult()
    }

    return (
        <div className="timer mt-3 pr-3">
            <div className="text-right">
                <span><i className="fas fa-stopwatch"></i> Time Remaining: </span>
                <span className="time pl-5">
                    {/* <Countdown renderer={renderer} date={Date.now() + 299000} /> */}
                    <Countdown renderer={renderer} date={props.timer} onComplete={completed}/>
                </span>

                
            </div>
        </div>
    )
}