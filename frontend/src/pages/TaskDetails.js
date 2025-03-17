import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTaskDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Verifica se a resposta contém os detalhes da tarefa
      if (!response.data) {
        throw new Error("Tarefa não encontrada.");
      }

      setTask(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao carregar os detalhes da tarefa.");
    } finally {
      setLoading(false);
    }
  };

  const markTaskAsCompleted = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTaskDetails(); // Atualiza os detalhes da tarefa após a marcação
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao marcar a tarefa como concluída.");
    }
  };

  const unmarkTaskAsCompleted = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}/uncomplete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTaskDetails(); // Atualiza os detalhes da tarefa após a desmarcação
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao desmarcar a tarefa como concluída.");
    }
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard"); // Redireciona para o dashboard após a exclusão
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir a tarefa.");
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Corrigido o erro de exibição
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Tarefa</h1>
      {task ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <p className="text-gray-700 mt-2">{task.description}</p>
          <p className="text-gray-500 mt-2">
            Status: {task.completed ? "Concluída" : "Pendente"}
          </p>
          {task.photo && (
            <div className="mt-4">
              <img
                src={task.photo}
                alt="Foto da Tarefa"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          <div className="mt-6 flex space-x-4">
            {!task.completed ? (
              <button
                onClick={markTaskAsCompleted}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Marcar como Concluída
              </button>
            ) : (
              <button
                onClick={unmarkTaskAsCompleted}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Desmarcar como Concluída
              </button>
            )}
            <button
              onClick={deleteTask}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Excluir Tarefa
            </button>
          </div>
        </div>
      ) : (
        <p>Tarefa não encontrada.</p>
      )}
    </div>
  );
};

export default TaskDetails;