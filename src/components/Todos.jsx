import React from 'react'

const Todos = ({text, deleteTodo, id, isComplete, tick}) => {
  return (
    <div className='flex items-center gap-2 my-6'>
        <div className='flex flex-1'>
            <img onClick={() => isComplete(id)} 

            src={tick ? "./tick.png" : "./not_tick.png"}

            className='w-7 h-7 cursor-pointer'/>
            <p className={`text-[23px] ml-4 text-decoration-slate-400 decoration-1 ${tick ? 'line-through' : ''}`}>{text}</p>
        </div>
        <img src="/delete.png" className='w-7 cursor-pointer' onClick={() => deleteTodo(id) }/>
    </div>
  )
}

export default Todos