import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import  *  as  data  from  '../data.json';

@Injectable()
export class TodoService {
    mockData: any  = (data  as  any).default;
    public todos: Todo[] = [];
    constructor() { 
      console.log(this.mockData)  
    }

    getAllTodos(): Todo[] {

        if(localStorage.getItem('localData') !== null){ 
            this.todos = JSON.parse(localStorage.getItem('localData'));
            console.log('Second');
        } else {
            var todoArrayData = this.mockData;
            localStorage.setItem('localData', JSON.stringify(todoArrayData));
            this.todos = JSON.parse(localStorage.getItem('localData'));
            console.log('First');
        }       
        return this.todos;
    }
    
    getTodoById(id: number): Todo {
        var todoArray = JSON.parse(localStorage.getItem('localData'));       
        console.log(todoArray);
        return todoArray
          .filter(todo => todo.id === id)
          .pop();
    }
  
    updateTodoById(todo): Todo {
        if (todo.id === 0) {                    
            var todoArray = JSON.parse(localStorage.getItem('localData'));
            var todoid = todoArray.length;
                todo.id = ++todoid;
                todoArray.push(todo);
            localStorage.setItem('localData', JSON.stringify(todoArray));
        } else {
            var todoSaveArray = JSON.parse(localStorage.getItem('localData'));
            for (var i in todoSaveArray) {
                if (todoSaveArray[i].id === todo.id) {
                    todoSaveArray[i] = todo;
                    localStorage.setItem('localData', JSON.stringify(todoSaveArray));
                }
            }
        }
        return todo;
    }
    
    deleteTodoDetail(id) {
       var todoArray = JSON.parse(localStorage.getItem('localData'));
        for (var i in todoArray) {
            if (todoArray[i].id === id) {
                todoArray.splice(i, 1);
                localStorage.setItem('localData', JSON.stringify(todoArray));  
            }
        }    
    };    
}
