import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }    

        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/tasks', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (err) {
                setError('Erro ao carregar tarefas');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [user, navigate]);

    const addTask = async (newTask) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/tasks', newTask, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks([...tasks, response.data]);
        } catch (err) {
            setError("Erro ao adicionar tarefa");
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (err) {
            setError("Erro ao excluir tarefa");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}
            <TaskForm addTask={addTask} />
            {loading ? <p>Carregando...</p> : <TaskList tasks={tasks} deleteTask={deleteTask} />}
        </div>
    );
};

export default Dashboard;