// Referencias generales

import { Todo } from "../class";

import { todoList } from "../index";

const d = document;

// Referencias en el Html

const divTodoList = d.querySelector(".todo-list")
const $newTodoInput = d.querySelector(".new-todo")
const $btnBorrar = d.querySelector(".clear-completed")
const $filter = d.querySelector(".filters")
const anchorFiltros = d.querySelectorAll('.filtro')

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed': ''}" data-id="${todo.id}">
		<div class="view">
		    <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': ''}>
		    <label>${todo.tarea}</label>
		    <button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>;
    `
    const div = d.createElement('div')
    div.innerHTML = htmlTodo;
    divTodoList.appendChild(div.firstElementChild)
    return div.firstElementChild
}


// Eventos
$newTodoInput.addEventListener('keyup',(event)=>{
    if(event.keyCode === 13 && $newTodoInput.value.length > 0){
        const nuevoTodo = new Todo($newTodoInput.value);
        todoList.nuevoTodo(nuevoTodo)
        crearTodoHtml(nuevoTodo)
        $newTodoInput.value = ""
    }
})

divTodoList.addEventListener('click',(e)=>{
    const nombreElemento = (e.target.localName);
    const todoElemento = (e.target.parentElement.parentElement)
    const todoId = todoElemento.getAttribute('data-id');
    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId)
        todoElemento.classList.toggle('completed')
    }
    if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento)
    }
})

$btnBorrar.addEventListener("click",e=>{
    todoList.eliminarCompletados();

    for (let i=divTodoList.children.length-1; i >=0; i--){
        const elemento = divTodoList.children[i]
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento)
        }
    }
})

$filter.addEventListener('click',e=>{
    const filtro = e.target.text
    if(!filtro) {return}
    anchorFiltros.forEach(elem=> elem.classList.remove('selected'))
    e.target.classList.add('selected')


    for(const element of divTodoList.children){
        element.classList.remove('hidden')
        
        const completado= element.classList.contains('completed')
        
        
        switch(filtro){
            case 'Pendientes':
                if(completado){
                    element.classList.add('hidden')
                }
            break
            case'Completados':
            if(!completado){
                element.classList.add('hidden')
            }
        }
    }
})

let contador = 0;









