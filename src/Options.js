export default function Options({question, dispatch , answer}){
    console.log(question.options);

    const hasAnswered = answer !== null


    return (
        <div className="options">
           {question.options.map((ele , index) => (
            <button className={`btn btn-option ${index === answer ? "answer" : ""}
             ${hasAnswered ? index === question.correctOption ? "correct" : "wrong" : "" } `}
            key={ele} onClick={() => dispatch({type : "newAnswer" , payload : index})}
            disabled={hasAnswered}>
                {ele}
            </button>
           ))}
        </div>
    )
}