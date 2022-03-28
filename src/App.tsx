import React from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";

function App() {

    const tasks1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
    ]

    const tasks2: Array<TaskType> = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]

    return (
        <div className="App">
            <ToDoList title="What to learn" tasks={tasks1}/>
            <ToDoList title="Songs" tasks={tasks2}/>
            <ToDoList title="Books" tasks={tasks2}/>
        </div>
    );
}

export default App;
