import { useReducer } from "react";


function reducer(state , action){
  console.log(state , action);
  switch(action.type){
    case "inc" :
     return {...state , count : state.count + state.step}
     case "dec" :
        return {...state , count : state.count - state.step}
      case "same" :
        return {...state , count : action.payload}
      case "step" :
        return {...state , step : action.payload}
      case "reset" :
        return{count : 0 , step : 1}
     default :
     throw new Error("erooooooooor")}}


function DateCounter1() {
  const initailState = {count : 0 , step : 1}
  const [state , dispatch] = useReducer(reducer , initailState)
  const {count , step} = state



  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type : "dec" , payload : 1})
  };

  const inc = function () {
    dispatch({type : "inc" , payload : 1})
  };

  const defineCount = function (e) {
    dispatch({type : "same" , payload : Number(e.target.value)})
  };

  const defineStep = function (e) {
    dispatch({type : "step" , payload : Number(e.target.value)})
  };

  const reset = function () {
    dispatch({type : "reset"})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter1;
