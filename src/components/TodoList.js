import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';


//it contains code if todo list..
function TodoList() {
    const [todos, setTodos] = useState([]);
    const [currentUser, setCurrentUser] = useState(1);
    const [localStorageCheck, setLocalStorageCheck] = useState(false);

    useEffect(() => {
        if (localStorageCheck) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, []);


    // useEffect(() => {
    //     const todosLocal = JSON.parse(localStorage.getItem('todos'));
    //     if (todosLocal) {
    //         setTodos(todosLocal);
    //     }
    // }, []);

    //To add todo item to list
    const addTodo = todo => {
        //check if todo input is empty
        if (!todo.title || /^\s*$/.test(todo.title)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        if (localStorageCheck) {
            const todosLocal = JSON.parse(localStorage.getItem('todos'));
            localStorage.setItem('todos', JSON.stringify([todo, ...todosLocal]));
        } else {
            //Creating Payload
            let payload = {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }

            //Sending api post request
            fetch(`https://jsonplaceholder.typicode.com/todos`, payload)
                .then((response) => response.json())
                .then((json) => console.log('Data sent to server Successfully', json))
                .catch(err => console.log(err));
        }

    };

    //tp update existing todo item
    const updateTodo = (todoId, newValue) => {
        if (!newValue.title || /^\s*$/.test(newValue.title)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
        if (localStorageCheck) {
            const todosLocal = JSON.parse(localStorage.getItem('todos'));
            localStorage.setItem('todos', JSON.stringify(todosLocal.map(todo => {
                if (todo.id === todoId) {
                    todo = newValue;
                }
                return todo;
            })));
        }

    };

    //to remove todo item from list
    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removedArr);
        // localStorage.setItem('todos', JSON.stringify(removedArr));
        if (localStorageCheck) {
            const todosLocal = JSON.parse(localStorage.getItem('todos'));
            localStorage.setItem('todos', JSON.stringify([...todosLocal].filter(todo => todo.id !== id)));
        }

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
        // localStorage.setItem('todos', JSON.stringify(updateTodo));
        if (localStorageCheck) {
            const todosLocal = JSON.parse(localStorage.getItem('todos'));
            localStorage.setItem('todos', JSON.stringify(todosLocal.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })));
        }
    };

    const getTodoList = userId => {
        if (localStorageCheck) {
            const todosLocal = JSON.parse(localStorage.getItem('todos'));
            if (todosLocal) {
                setTodos(todosLocal.filter((todo) => userId === todo.userId));
            }

        } else {
            fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
                .then((response) => response.json())
                .then((json) => setTodos(json))
                .catch(err => console.log(err));
        }
    }

    //to handle user id change
    const userChangeHandle = userId => {
        setCurrentUser(userId)
        getTodoList(userId)
    }
    const handleLocalStorageCheck = (e) => {
        setCurrentUser(currentUser)
        setLocalStorageCheck(e.target.checked)
        getTodoList(currentUser)
    }

    return (
        <>
            <div className='local-storage-checkbox'> <input type="checkbox" checked={localStorageCheck} onChange={handleLocalStorageCheck} />Use Local Storage </div>
            <h1>What's the Plan ?</h1>
            <TodoForm onSubmit={addTodo} onUserChange={userChangeHandle} />


            {/* list of todo items */}

            {
                todos.length > 0 ? <Todo
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
