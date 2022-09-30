
import React, { useState, useEffect, useRef } from 'react';

//This contains code for the form.

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const [userId, setUserId] = useState('');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    //To handle todo input change
    const handleChange = e => {
        setInput(e.target.value);
    };

    //To handle user input change
    const handleUserIdChange = e => {
        setUserId(e.target.value);
        props.onUserChange(userId)
    };

    //To handle Add button click
    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            userId: userId || 1,
            id: Math.floor(Math.random() * 10000),
            title: input
        });

        //Creating Payload
        let payload = {
            method: 'POST',
            body: JSON.stringify({
                userId: userId || 1,
                id: Math.floor(Math.random() * 10000),
                title: input,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        //Sending api post request
        fetch(`https://jsonplaceholder.typicode.com/todos`, payload)
            .then((response) => response.json())
            .then((json) => console.log('Data sent to server Successfully', json))
            .catch(err => console.log(err));


        //empty input after add button is clicked
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {props.edit ? (
                <>
                    {/* input for editing todo item */}
                    <input
                        placeholder='Update your item'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        ref={inputRef}
                        className='todo-input edit'
                    />
                    <button onClick={handleSubmit} className='todo-button edit'>
                        Update
                    </button>
                </>
            ) : (
                <>
                    <div>
                        {/* input for user id */}

                        <input
                            placeholder='User Id (default: 1)'
                            value={userId}
                            onKeyUp={handleUserIdChange}
                            onChange={handleUserIdChange}
                            name='userId'
                            // ref={inputRef}
                            className='todo-input edit'
                        />

                    </div>
                    {/* input for add todo item */}

                    <input
                        placeholder='Add a todo'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        className='todo-input'
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} className='todo-button'>
                        Add todo
                    </button>
                </>
            )
            }
        </form >
    );
}

export default TodoForm;
