import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';


//it contains code for todo Item
const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    //To handle todo item edit/update
    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => (
        <div
            className={todo.completed ? 'todo-row complete' : 'todo-row'}
            key={index}
        >
            <div className='todo-text' key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.title}
            </div>
            <div className='icons'>
                <RiCloseCircleLine
                    onClick={() => removeTodo(todo.id)}
                    className='delete-icon'
                />
                <TiEdit
                    onClick={() => setEdit({ id: todo.id, value: todo.title })}
                    className='edit-icon'
                />
            </div>
        </div>
    ));
};

export default Todo;
