import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";


const Courses = ({courses}) => {
    
    return(<>
    <h1>WebDevelopment Curriculum</h1>
        {courses.map((course) => {
            return <>
        <Header course = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts}/>
        </>
        })}
        
        </>
    )

}

export default Courses;