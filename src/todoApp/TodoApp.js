import React, { useRef, useState, useCallback } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const TodoApp = () => {
    const [todos, setTodos] = useState([
        {
          id: 1,
          text: 'TDD 배우기',
          done: true
        },
        {
          id: 2,
          text: 'react-testing-library 사용하기',
          done: true
        }
      ]);
    const nextId = useRef(3)
    const onInsert = useCallback((text) => {
        setTodos([
            ...todos,
            {
                id: nextId,
                text,
                done: false
            }]
        )
        nextId.current += 1
    },[todos])
    const onToggle = (id) => {
        setTodos(todos.map(todo=>todo.id === id? {...todo, done: !todo.done} : todo))
    }
    return(
        <>
            <TodoForm onInsert={onInsert}/>
            <TodoList todos={todos} onToggle={onToggle}/>
        </>
    )
}

export default TodoApp