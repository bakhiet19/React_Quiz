export default function Startscreen({numQuestions , dispatch}){
    return(
        <div className="start">
            <h2>Welcome to the React Quiz</h2>
            <h3><span className="num">{numQuestions}</span> Questions to test your react mastery</h3>
            <button className="btn btn-ui" onClick={() => dispatch({type : "active"})}>Lets start</button>
        </div>
    )
}