import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tasks');
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const completeTask = async (id) => { 
        try {
            await axios.put(`http://localhost:3000/tasks/${id}`, { completed: true });
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
            <h2 className='text-2xl font-bold mb-4 text-center'>Lista de Tarefas</h2>
            {tasks.length === 0 ? (
                <p className='text-center text-gray-500'>Nenhuma tarefa encontrada.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className='flex justify-between items-center p-3 mb-2 border rounded-lg'>
                            
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
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;