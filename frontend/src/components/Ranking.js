import { useState, useEffect } from 'react';
import axios from 'axios';

const Ranking = () => { 
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        fetchRanking();
    }, []);

    const fetchRanking = async () => {
        try {
            const response = await axios.get('http://localhost:3000/ranking');
            setRanking(response.data);
        } catch (error) {
            console.log('Erro ao buscar ranking: ', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Ranking de Usuários</h2>
            {ranking.length === 0 ? (
                <p className="text-center text-gray-500">Nenhum dado disponível.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Posição</th>
                            <th className="border border-gray-300 px-4 py-2">Usuário</th>
                            <th className="border border-gray-300 px-4 py-2">Pontos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking.map((user, index) => (
                            <tr key={user.id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{index + 1}º</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.pontos}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Ranking;