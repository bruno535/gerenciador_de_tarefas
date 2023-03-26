import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
  });

  //pegando no atlas
  useEffect(() => {
    axios.get('http://localhost:3000/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  // chave, valor
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // adiciona no atlas via post
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/tasks', newTask).then((response) => {
      setTasks([...tasks, response.data]);

      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
      });
    });
  };
  // deleta no atlas
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };


  return (
    <>
      <FormBlock>
        <h1>Gerenciador de Tarefas</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Titulo"
          />
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Descrição"
          />
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="priority"
            min="0"
            max="4"
            value={newTask.priority}
            onChange={handleInputChange}
            placeholder="Prioridade (1 / 2 / 3 / 4)"
          />
          <button type="submit">Adicionar Tarefa</button>
        </form>
      </FormBlock>
      <TaskBlock>
        <ul>
          {tasks.map((task) => {
            //formatando data
            const data = new Date(task.dueDate);
            const dia = data.getUTCDate().toString().padStart(2, '0');
            const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
            const ano = data.getUTCFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`

            return (
              <li key={task._id}>
                <h2>{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</h2>
                <p>{task.description.charAt(0).toUpperCase() + task.description.slice(1)}</p>
                <p>{dataFormatada}</p>
                <p>Prioridade {task.priority}</p>
                <button onClick={() => handleDelete(task._id)}>Deletar</button>
              </li>
            )
          })}
        </ul>
      </TaskBlock>
    </>
  );
}

export default App;

const FormBlock = styled.div`
display: flex;
flex-direction: column;
align-items: center;

h1 {
  color: #3466af;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #cdd9e5;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  width: 25em;
  
  @media (max-width: 769px) {
    width: 80vw;
  }
}

input[type="text"],
input[type="number"],
input[type="date"],
textarea {
  border: 1px solid #cdd9e5;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
}

button[type="submit"] {
  background-color: #3466af;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover{
  background-color: #2d4e7e;
}
`

const TaskBlock = styled.div`
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  
}

li {
  text-align: center;
  min-width: 200px;
  background-color: #fff;
  border: 1px solid #cdd9e5;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;

  @media (max-width: 769px) {
    width: 83vw;
  }
}

li h2 {
  color: #3466af;
}

li button {
  background-color: #d62828;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

li button:hover {
  background-color: #b71c1c;
}

@media (max-width: 767px) {
  form {
    padding: 10px;
  }

  input[type="text"],
  input[type="number"],
  input[type="date"],
  textarea {
    padding: 6px;
  }

  button[type="submit"] {
    padding: 8px 16px;
  }

  li {
    padding: 10px;
  }
}
`