import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {Fullinput} from "./components/Fullinput";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    // v1() function to make ID for the first two TODOlist
    let todolistID1 = v1();
    let todolistID2 = v1();
    // Global state (data with an initial list of TODOlist)
    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    // Global state (data with an initial list of elements in TODOlist)
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Eggs", isDone: false},
            {id: v1(), title: "Apples", isDone: false},
            {id: v1(), title: "Bananas", isDone: false},
        ]
    });
    // Function to remove task from initial state by ID
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }
    // Function to add task
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }
    // Function to change status if the task
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }
    // Function to change filter
    function changeFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    // Function to remove TODOlist
    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks});
    }
    // Function to add TODOlist
    function addTodolist(newTitle: string) {
        let newId = v1();
        let newTodolist: TodolistsType = {id: newId, title: newTitle, filter: "all"};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newId]: []})
    }
    // Function to edit TODOlist title
    function editTodolist(todolistId: string, newTitle: string) {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }
    // Function to edit task title in TODOlist
    function editTask(todolistId: string, taskID: string, newTitle: string) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map(el => el.id === taskID ? {...el, title: newTitle} : el)});
    }

    return (
        <div className="App">
            <Fullinput callBack={addTodolist}/>
            {todolists.map((el) => {
                let tasksForToDoList;
                switch (el.filter) {
                    case "completed":
                        tasksForToDoList = tasks[el.id].filter(t => t.isDone)
                        break
                    case "active":
                        tasksForToDoList = tasks[el.id].filter(t => !t.isDone)
                        break
                    default:
                        tasksForToDoList = tasks[el.id];
                }
                return (
                    <ToDoList
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        editTodolist={editTodolist}
                        editTask={editTask}
                    />
                )
            })}
        </div>
    );
}

export default App;
