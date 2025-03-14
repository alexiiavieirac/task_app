const { useEffect, useState } = require('react');
const axios = require('axios');

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('http://localhost:3000/tasks', { title, points });
            setTitle('');
            setPoints(0);
            onTaskAdded();
        } catch (err) {
            console.log("Erro ao adicionar tarefa: ", err);
            setError('Ocorreu um erro ao adicionar a tarefa.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-6 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-center">Adicionar Nova Tarefa</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Pontos:</label>
                    <input
                        type="number"
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? "Adicionando..." : "Adicionar Tarefa"}
                </button>
            </form>
        </div>
    );  
};

export default TaskForm;