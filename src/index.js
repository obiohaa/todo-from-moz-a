import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DATA = [
  {id:"todo-0", name:"eat", completed: true },
  {id:"todo-1", name:"sleep", completed: false },
  {id:"todo-2", name:"repeat", completed: false }
]

ReactDOM.render(
  <React.StrictMode>
    <App tasks = {DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);
//credit to
//https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started
