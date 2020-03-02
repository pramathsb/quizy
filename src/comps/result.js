import React from 'react'
import { Chart } from "react-google-charts";

export default function (props) {

    let correctAnswers = Object.values(props.result).filter( (e) =>{
        if(e===true) 
        return true 
        else 
        return false}).length
    const data = [
        ["Element", "Answer", { role: "style" }],
        ["Correct", correctAnswers, "#85df89"], // RGB value
        ["Wrong", props.question-correctAnswers, "#d95651"], // English color name
      ];

    return (
        <div className="result">
            <div className="qb my-3">
                <div className="qb_header">
                    Result
                </div>

                <div className="graph">
                    <Chart
                        chartType="ColumnChart"
                        width="80%"
                        height="600px"
                        data={data}
                        options = {{
                            legend: {position: 'none'},
                            backgroundColor: 'transparent',
                            vAxis : {
                                gridlines: {
                                    color: 'transparent'
                                },
                                textStyle: {
                                    color: "transparent"
                                },
                            },
                        }}
                        />
                </div>

                <div className="qb_actions">
                <div className="row no-gutters">
                    <div className="col text-center">

                        <button className="btn btn-sec" onClick={(e)=>props.reset()} ><i className="fas fa-undo"></i> Retry</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}