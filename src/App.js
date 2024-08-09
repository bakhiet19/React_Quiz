import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import Startscreen from './Startscreen';
import Questions from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
// import DateCounter1 from './DateCounter1';


const initialState = {
  question : [],
  status : "Loading",
  answer : null,
  index : 0,
  points : 0,
}


function reducer(state , action){
  switch(action.type){
    case "dataRecieved" :
    return {...state , 
      status : "Ready",
      question : action.payload ,
    }
    case "Error" :
    return {...state , 
      status : "Error"
    }
    case "active" :
      return {...state ,
        status : "Active",
      }
     case "newAnswer" : 
     const question = state.question.at(state.index)
     return{
      ...state ,
      answer : action.payload,
      points : action.payload === question.correctOption ?
       state.points + question.points : state.points 
     }
     case "nextQuestion" :
      return{
        ...state,
        index : state.index + 1,
        answer : null 
      }
      case "finished" : {
        return{
          ...state,
          status : "finished"
        }
      }
      case "restart" : {
        return{
         ...initialState,
         question : state.question,
         status : "Ready"
        }

      }
    default : 
    throw new Error("error")
  }
}


export default function App() {


 
  const [state , dispatch] = useReducer(reducer , initialState)
  const {question , status , index , answer , points} = state
  
  console.log(status);
  

  
  const numQuestion = question.length
  const maxPossiblePoints = question.reduce((prev , curr) => prev + curr.points, 0)




  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((res)=> res.json())
    .then((data) => dispatch({type : "dataRecieved" , payload : data}))
    .catch((error) => dispatch({type : "Error"}))
  } , [])


  return (
    <div className="app">
     <Header />
     <Main>
     {status === "loading" && <Loader />}
     {status === "Error" && <Error />}
     {status === "Ready" && <Startscreen
      numQuestions={numQuestion} dispatch={dispatch} />}
    
     {status === "Active" && 
    ( <>
      <Progress index={index} numQuestion={numQuestion}
       points={points} maxPossiblePoints={maxPossiblePoints} />
     <Questions question={question[index]}
      dispatch={dispatch} answer={answer} />
      <NextButton dispatch={dispatch} answer={answer}
      numQuestions={numQuestion} index={index} />
      </>)
      }
      {status === "finished" && <FinishScreen points={points}
       maxPossiblePoints={maxPossiblePoints} dispatch={dispatch} />}
     </Main>
   
    </div>
  );
}


