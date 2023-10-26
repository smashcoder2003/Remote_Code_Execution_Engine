import React from 'react';
import './Problems.css';
import StatementCard from '../StatementCard/StatementCard';

export default function Problems() {
    const header = <h1 style={{
        paddingLeft: "10px",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }}>My Assignments</h1>
    let assignments = [
        {qid: 'qid1', question: 'Assignment 1'},
        {qid: 'qid2', question: 'Assignment 2'},
        {qid: 'qid3', question: 'Assignment 3'}
    ]

    assignments = assignments.map(assignment => {
        return <StatementCard key={assignment.qid} question={assignment.question}/>;
    });

        return (
            <>

                <div className="Title">
                    {header}
                    <div className="statements">
                        {assignments}
                    </div>
                </div>
            </>
    );
}