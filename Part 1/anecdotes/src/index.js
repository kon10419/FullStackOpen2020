import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  const [popular, setPopular] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  let mostVotes = 0;

  const findPopular = (copy) => {
    let votesCopy = [...copy];
      votesCopy = votesCopy.sort((a,b) => b - a);
      console.log("votes " , votes);
     console.log("votesCopy " , votesCopy);
     for(let i = 0; i < anecdotes.length; i++){
       if(copy[i] === votesCopy[0]){
         mostVotes = i;
         i = anecdotes.length;
         setPopular(mostVotes);
       }
     }
  }
    
  
    const getAnecdote = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    Math.floor(random);
    setSelected(random);
    console.log(random);
  }
    const addVote = () =>{
      if(hasVoted === false){
        setHasVoted(true);
      }
    let oldNum = votes[selected];
    let copy = [...votes]
    copy[selected] = oldNum +1;

    setVotes(copy);
    findPopular(copy);
  }
  
  return (
    <div>
    <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]} </p>
      <p>has {votes[selected]} votes</p>
      <button onClick={addVote}> Vote</button>
      <button onClick={getAnecdote}>New Anecdote</button>
      <h1>{hasVoted ? "Anecdote with the most votes" : ""}</h1>
      <p>{hasVoted ? props.anecdotes[popular] : ""}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)