import React, { useState } from 'react';
import axios from 'axios';
import style from './App.module.css';

const url: string = 'https://api.elchocrud.pro/api/v1/4098d39f0c74ce68a2ed0a900c997826/todos';

interface Todo {
  id: number;
  text: string;
  completed: boolean;

}



const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');



  const getTodo = async () => {
    try {
      const response = (await axios.get<Todo[]>(url)).data;
      setTodos(response);
      
    } catch (error) {
      console.error(error);
      
    }
    
  };

  
  
  const postTodo = async () => {
    if (newTodo === '') return;
    const newTodoItem: Todo = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
      
    };
    
    try {
      const response = (await axios.post<Todo[]>(url, newTodoItem)).data;
      setTodos(response);
      setNewTodo('');
      
    } catch (error) {
      console.error(error);
      
    }
    getTodo();
  };
  


  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    
      );
  
    };



    const deleteTodo = async (id: number) => {
      try {
        const response = (await axios.delete<Todo[]>(url)).data;
        console.log(response);
        setTodos((response) => response.filter((todo) => todo.id !== id));
        
      } catch (error) {
        console.error(error);
        
      }
        
    }

    


  return (
    <>
      <header className={style.header}>
        <h1 className={style.title}>TODO LIST</h1>
      </header>
        <section className={style.section}>
        <input
          className={style.input}
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className={style.button} onClick={postTodo}>Add Todo</button>
        </section>
        <main className={style.main}>
          <ul>
          {todos.map((todo) => (
            <li className={style.list} key={todo.id}>
              <input className={style.checkbox}
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                />
              <span className={style.todo}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                >
                {todo.text}
              </span>
         <button className={style.delete} onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
          </ul>
        </main>
    </>
  
  );

};

export default App;
