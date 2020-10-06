import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
  <>
    <button onClick = {props.handleClick}>{props.text}</button>
  </>
  )
}

const Statistic = (props) => {
  if(props.type === "positive"){
    return <tr>{props.type} {props.num} %</tr>
  }
  return <tr>{props.type} {props.num}</tr>
}

const Statistics = (props) => {
  if(props.feedback === true){
return <>
      <h1>statistics</h1>
    <table>
      <Statistic type="good" num={props.good}/>
      <Statistic type="neutral" num={props.neutral}/>
      <Statistic type="bad" num={props.bad} />
      <Statistic type="all" num={props.total} />
      <Statistic type="average" num={props.average} />
      <Statistic type="positive" num={props.percent} />
    </table>
</>
  }
  return(
  <>
    <h1>Statistics</h1>
    <p>No feedback given</p>
  </>)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState(false)

  //const [average, setAverage] = useState(0)
  //const [percent, setPercent] = useState(0)
  let positive = good;
  let negative = bad;
  let total = good+bad+neutral;
  let average = (positive - negative) / total;
  let percent = (positive / total) * 100;
  
  

  const handleClick = (review) => {
    if(feedback === false){
      setFeedback(true);
    }
    if(review === "good"){
      setGood(good + 1);
      console.log("After Press", good);
      
    }
    else if(review === "neutral") {
      console.log("Before Press", neutral);
      setNeutral(neutral +1);
      console.log("After Press " , neutral);
    }
    else{
      console.log("Before Press ", bad);
      setBad(bad + 1);
      console.log("After Press ", bad);
    }
    
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() => {handleClick("good")}} text="Good"/>
      <Button handleClick = {() => {handleClick("neutral")}} text="Neutral"/>
      <Button handleClick = {() => {handleClick("bad")}} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} percent={percent} feedback={feedback}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
