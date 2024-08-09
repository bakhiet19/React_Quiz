import { useEffect, useReducer } from "react"
import Loader from "./Loader"
import Error from "./Error"
import Startscreen from "./Startscreen"
import Header from "./Header"



function reducer(state , action){
    switch(action.status){
        case "ready" :
            return {...state , questions : action.payload , status : "ready"}
        case "error" :
            return {...state , questions : action.payload , status : "error"}
        default :
        throw new Error("Ich bin Error")
    }
}
const initialState = {
    questions : [],
    status : "Loading"
  }

export default function App2(){

    const [state , dispatch] = useReducer(reducer , initialState)
    const {questions , status} = initialState

    const numQuestion = questions.length



    useEffect(function(){
        fetch("http://localhost:8000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({status : "ready" , payload : data}))
    }, [])



    return(
        
    <div className="app">
    <Header />
     {status === "loading" && <Loader />}
     {status === "error" && <Error />}
     {status === "ready" && <Startscreen numQuestion={numQuestion} />}
        </div>
    )
}