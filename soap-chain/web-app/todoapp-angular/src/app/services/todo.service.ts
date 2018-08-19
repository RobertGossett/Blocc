import ToDo from '../models/todo.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

// import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
    api_url = 'http://localhost:3000';
    todoUrl = `${this.api_url}/api/todos`;

    constructor(private http: HttpClient) {

    }

    //Create todo, takes a todo object
    createTodo(todo: ToDo): Observable<any> {
        return this.http.post(`${this.todoUrl}`, todo);
    }

    //Read todo, takes no arguments
    getToDos(): Observable<ToDo[]> {
        return this.http.get(this.todoUrl).pipe(map(res => {
            return res["data"].docs as ToDo[];
        }));
    }

    editTodo(id:string):any {
        let deleteUrl = `${this.todoUrl}/${id}`
    }

}