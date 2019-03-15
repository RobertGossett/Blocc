import {Response} from '@angular/http';
import { TodoService } from './services/todo.service';
import ToDo from './models/todo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    private todoService: TodoService){}

  //Declaring the new todo object and initializing it
  public newTodo: ToDo = new ToDo();

  //An empty list for the visible todolist 
  todosList: ToDo[];
  editTodos: ToDo[] = [];

  ngOnInit():void {
    
    //At component initialization
    this.todoService.getToDos()
      .subscribe(todos => {
        // assign the todolist property to the proper http response
        this.todosList = todos
        console.log(todos) 
      })
  }
  // create a new todo on the front end
  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res.data)
        this.newTodo = new ToDo()
      })
  }

  editTodo(todo: ToDo) {
    console.log(todo)
    if(this.todosList.includes(todo)){
      if(!this.editTodos.includes(todo)){
        this.editTodos.push(todo)
      }else{
        this.editTodos.splice(this.editTodos.indexOf(todo), 1)
        this.todoService.editTodo(todo).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editTodo(todo)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  doneTodo(todo: ToDo){
    todo.status = 'Done'
    this.todoService.editTodo(todo).subscribe(res => {
      console.log('Update Successful')
    }, err => {
      this.editTodo(todo)
      console.error('Updated Unsuccessful')
    })
  }

  submitTodo(event, todo:ToDo) {
    if(event.keyCode == 13){
      this.editTodo(todo)
    }
  }

  deleteTodo(todo: ToDo) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    })
  }

  title = 'bloccwallet-angular';
}
