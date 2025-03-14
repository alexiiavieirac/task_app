import React from 'react';

const TaskItem = ({ task, completedTask, deleteTask }) => {
    return (
        <li className='flex justify-between items-center p-3 mb-2 border rounded-lg shadow'>
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
            </span>

            <button className='bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600' onClick={() => completedTask(task.id)}>
                ✔
            </button>

            <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600' onClick={() => deleteTask(task.id)}>
                ✖
            </button>
        </li>      
    );
};

export default TaskItem;