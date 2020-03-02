import React from 'react'

export default function (props) {
    return (
        <React.Fragment>
            <header>
                <div className="container">
                    <h2>Quiz Time</h2>
                    </div>
            </header>
            <main className="container">
                {props.children}
            </main>
        </React.Fragment>
    )
}