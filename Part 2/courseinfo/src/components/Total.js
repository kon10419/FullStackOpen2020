import React from "react";

const Total = (props) => {
    let total = 0;
    let parts = props.parts;
    let num = 0;
    total = parts.map(part => { //adds number of exercises for each part to num
         num += part.exercises;
    });
    total = num;
    return <>
      <p><b>total of {total} exercises</b></p>
      </>
  
  }

  export default Total;