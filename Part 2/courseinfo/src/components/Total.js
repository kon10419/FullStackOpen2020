import React from "react";

const Total = (props) => {
    let parts = props.parts;
    let num = 0;
    let allExercises =[]
     parts.map((part) => {
      allExercises.push(part.exercises);
    })

     let total = parts.reduce((s,p) => {
      return s + p.exercises;
     },0)

     console.log(total);
    return <>
      <p><b>total of {total} exercises</b></p>
      </>
  
  }

  export default Total;