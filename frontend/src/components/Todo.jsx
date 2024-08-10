import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/todo.css'

const Todo = () => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('ongoing');
  const [filter, setFilter] = useState('all'); 
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
   
  const addTodo = async () => {
    if (!description.trim()) {
        alert("Please enter a todo description");
        return;
      }
    try {
      const response = await axios.post('http://localhost:4000/todos/add', {
        description,
        status,
      });
      console.log(response.data);
      fetchTodos();  
      setDescription('');  
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/todos/get');
      setTodos(response.data);
      applyFilter(response.data); 
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  useEffect(() => {
    fetchTodos();  
  }, []);

  const handleCheckboxClick = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:4000/todos/${id}`, {
        status: 'completed',
      });
      console.log(response.data);
      fetchTodos(); 
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/todos/${id}`);
      console.log(response.data);
      fetchTodos(); 
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  // Function to apply filter
  const applyFilter = (todos) => {
    if (filter === 'all') {
      setFilteredTodos(todos);
    } else if (filter === 'completed') {
      setFilteredTodos(todos.filter(todo => todo.status === 'completed'));
    } else if (filter === 'incomplete') {
      setFilteredTodos(todos.filter(todo => todo.status === 'ongoing'));
    }
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter); 
    
    // Apply filter based on the selected option
    if (selectedFilter === 'all') {
      setFilteredTodos(todos);
    } else if (selectedFilter === 'completed') {
      setFilteredTodos(todos.filter(todo => todo.status === 'completed'));
    } else if (selectedFilter === 'incomplete') {
      setFilteredTodos(todos.filter(todo => todo.status === 'ongoing'));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className='todo'>Todo List</h1>
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter new todo" 
        />
        <select 
          className="form-control mt-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn btn-primary mt-2" onClick={addTodo}>Add</button>
      </div>

      {/* Filter dropdown */}
      <div className="mb-3">
      <h4 className='filter'>Filter By:</h4>
        <select 
          className="form-control"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Check</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo, index) => (
            <tr key={todo._id}>
              <th scope="row">{index + 1}</th>
              <td style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}>
                {todo.description}
              </td>
              <td>
                {todo.status === 'completed' ? 'Completed' : 'Ongoing'}
              </td>
              <td>
                <input 
                  type="checkbox"
                  checked={todo.status === 'completed'}
                  disabled={todo.status === 'completed'}
                  onChange={() => handleCheckboxClick(todo._id)} 
                />
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(todo._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
