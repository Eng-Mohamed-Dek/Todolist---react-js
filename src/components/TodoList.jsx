import React, { useEffect, useRef, useState } from 'react'
import Todos from './Todos'

const TodoList = () => {
  const [tasks, setTasks] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])

    //get value from input 
  const inputRef = useRef();

//add new task 
  const AddTask = () => {
      let inputValue = inputRef.current.value.trim();

      if(inputValue === '') {
        return null
      } else {
          const NewTask = {
            id: Date.now(),
            text: inputValue,
            isComplete: false,
          }

          setTasks((prevTasks) => [...prevTasks, NewTask])
          inputRef.current.value = ''
      }
  }

   //delete function 
    const deleteTodo = (id) => {
        setTasks((prevTasks) => {
            return prevTasks.filter((todo) => todo.id !== id)
        })
    }

    // iscomplete 
    const isComplete = (id) => {
        setTasks((prevTasks) => {
            return prevTasks.map((todo) => {
                if(todo.id === id) {
                    return {
                      ...todo, isComplete: !todo.isComplete
                    }
                }
                return todo
            })
        })
    }

    useEffect(() => {
        localStorage.setItem('todos' , JSON.stringify(tasks))
    }, [tasks])

  return (
        // App container 
        <div className='bg-white border border-gray-950 place-self-center w-11/12 max-w-md flex flex-col  rounded-lg p-8 py-16
        min-h-[200px] min-w-[450px] mt-10
        '>
        {/* title app  */}
        <div className='flex items-center justify-center gap-10'>
            <h1 className='text-4xl font-bold'>TodoList App</h1>
            <img src="/todo_icon.png" className='w-12'/>
        </div>

        {/* inputField */}
        <div className='mt-10 flex items-center bg-gray-200 rounded-full'>
            <input type="text" placeholder='Enter TodoList'
            className='flex-1 bg-transparent border-0 outline-0 h-14 pr-4 pl-6 placeholder:text-slate-600 text-[18px]'
            onKeyDown={(e) => {
                if(e.key === 'Enter') {
                    AddTask()
                }
            }}
            // Get value 
            ref={inputRef}
            />
            <button className='border-none outline-0 bg-slate-800 text-white text-xl w-32 h-14 rounded-full cursor-pointer'
            onClick={AddTask}
            >Add Task</button>
        </div>

        {/* Todos */}
        <div>
            {tasks.map((task) => (
                <Todos text={task.text} deleteTodo={deleteTodo} id={task.id} isComplete={isComplete} tick={task.isComplete}/>
            ))}
        </div>
    </div>
  )
}

export default TodoList