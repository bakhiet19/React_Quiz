export default function FinishScreen({points , maxPossiblePoints , dispatch}){

    const percentage = (points / maxPossiblePoints) * 100
    console.log(percentage);
    

    return(
        <>
        <p className="result">Your Score is <strong> {points} </strong> out of
           {` `}{maxPossiblePoints} ({+ percentage.toFixed(0)  }%)</p>
            <button className="btn btn-ui" onClick={() => dispatch({type : "restart"})}>
                    Restart Quiz</button></>
    )
}