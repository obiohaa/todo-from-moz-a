//import React from "react";
import Todo from "./component/todo.js";
import Form from "./component/Form";
import FilterButton from "./component/FilterButton";
import React, {useRef, useState, useEffect} from "react";
import {nanoid} from "nanoid"
//You should always pass a unique key to anything you render with iteration.

function usePrevious(value){
  const ref = useRef()
  useEffect(()=> {
    ref.current = value;
  })
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')


  function addTask(name){
    const newTask = {id:"todo-" + nanoid(), name:name, completed:false}
    setTasks([...tasks, newTask])
    alert(name);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map( task => {
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter( task => id !== task.id)
    setTasks(remainingTasks)
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map( task => {
      if(id === task.id){
        return {...task, name: newName}
      }
      return task
    })
    setTasks(editedTaskList)
  }

//.filter takes the FILTER_MAP object and pass the current state filter into it. if the current state pressed is All
//from the object, () => true is called as a parameter for the filter...

  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (<Todo id={task.id} name={task.name} completed={task.completed} key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  /> ))

  const filterList = FILTER_NAMES.map( name => (<FilterButton key={name} name={name} 
    isPressed={name === filter}
    setFilter ={setFilter}
  />))

  const taskNoun = taskList.length !==  1 ? 'tasks': 'task';
  const headingText = `${taskList.length} ${taskNoun} remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskList = usePrevious(tasks.length)

  useEffect(()=> {
    if(tasks.length - prevTaskList === -1){
      listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskList])

  return (
    <div className="todoapp stack-large">
      <h1>To Do</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        //role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
