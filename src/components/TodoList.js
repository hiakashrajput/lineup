import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';


//it contains code if todo list..
function TodoList() {
    const [todos, setTodos] = useState([]);

    //To add todo item to list
    const addTodo = todo => {
        //check if todo input is empty
        if (!todo.title || /^\s*$/.test(todo.title)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    //tp update existing todo item
    const updateTodo = (todoId, newValue) => {
        if (!newValue.title || /^\s*$/.test(newValue.title)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    //to remove todo item from list
    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removedArr);
    };

    //to mark todo item as completed or not completed
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    //to handle user id change
    const userChangeHandle = userId => {
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
            .then((response) => response.json())
            .then((json) => setTodos(json))
            .catch(err => console.log(err));
    }

    return (
        <>
            <h1>What's the Plan ?</h1>

            <TodoForm onSubmit={addTodo} onUserChange={userChangeHandle} />


            {/* list of todo items */}

            {todos.length > 0 ? <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            /> : <span className='no-data'>No data</span>
            }
        </>
    );
}

export default TodoList;
