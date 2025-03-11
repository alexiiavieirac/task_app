import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/tasks')
           .then(response => setTasks(response.date))
           .catch(error => console.log(error));    
    }, []);
}