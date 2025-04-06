// src/app/app.component.ts
import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router'

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo List';
  todos: Todo[] = [];
  newTodoText = '';
  nextId = 1;
  editText = '';

  addTodo(): void {
    if (this.newTodoText.trim()) {
      const newTodo: Todo = {
        id: this.nextId++,
        title: this.newTodoText,
        completed: false
      };
      this.todos.push(newTodo);
      this.newTodoText = '';
    }
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
  }

  startEdit(todo: Todo): void {
    this.todos.forEach(t => t.editing = false);
    todo.editing = true;
    this.editText = todo.title;
  }

  saveEdit(todo: Todo): void {
    if (this.editText.trim()) {
      todo.title = this.editText;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}