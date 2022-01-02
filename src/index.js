import './styles.css';
// import Todo from './class/todo.class.js';

// import TodoList from './class/todo-list.class.js';

import{Todo,TodoList}from './class'
import { crearTodoHtml } from './js/componentes.js';

export const todoList = new TodoList()

const $contador = document.getElementById("number")

todoList.todos.forEach(crearTodoHtml) 
let contador = 1;
for(let todos of todoList.todos){
    todos = (todos.completado) ? $contador.innerHTML= contador : $contador.innerHTML = contador++
}

// console.log('todos', todoList.todos)
