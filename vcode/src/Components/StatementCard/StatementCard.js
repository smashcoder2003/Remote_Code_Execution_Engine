import './StatementCard.css';
export default function StatementCard({question}) {
    // fetches content from the api
    return (
        <>
        <div className="statementCard">
            <div className="Item1"> Logo</div>
            <div className="Item2"> {question} </div>
            <div className="Item3"> Open</div>
        </div>
        </>
    );
}


