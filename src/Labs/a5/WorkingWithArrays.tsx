import React, { useState, useEffect } from "react";
import axios from "axios";


interface Todo {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
}

function WorkingWithArrays() {

    const [todo, setTodo] = useState<Todo>({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const API = "http://localhost:4000/a5/todos";

    const [todos, setTodos] = useState<Todo[]>([]);

    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };

    const fetchTodos = async () => {
        const response = await axios.get<Todo[]>(API);
        setTodos(response.data);
    };

    const fetchTodoById = async (id: number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };

    const removeTodo = async (todo: Todo) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };

    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h3>Working with Arrays</h3>
            <label> ID: <br/>
            <input type="number" value={todo.id}
                onChange={(e) => setTodo({
                    ...todo, id: parseInt(e.target.value)
                })} /></label><br/>
            <label>Title: <br/><input type="text" value={todo.title}
                onChange={(e) => setTodo({
                    ...todo, title: e.target.value
                })} /></label><br />
            <label>Description: <br/><input type="text" value={todo.description}
                onChange={(e) => setTodo({
                    ...todo, description: e.target.value
                })} /></label><br />
            <label> Completed: <br/>
            <input type="checkbox" checked={todo.completed}
                onChange={(e) => setTodo({
                    ...todo, completed: e.target.checked
                })} /></label><br />
            <button className="btn btn-primary" onClick={createTodo} >
                Create Todo
            </button><br />
            <button  className="btn btn-danger"onClick={updateTitle} >
                Update Title
            </button><br />
            <ul className="list-group">
                {todos.length > 0 && todos.map((todo) => (
                    <li className="list-group-item" key={todo.id}>
                        {todo.title}
                        <button className="btn btn-primary" onClick={() => fetchTodoById(todo.id)} >
                            Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => removeTodo(todo)} >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <a className="btn btn-primary" href={`${API}/${todo.id}/completed/${todo.completed}`} >
                Complete Todo ID = {todo.id}
            </a><br /><br />
            <a className="btn btn-primary" href={`${API}/${todo.id}/description/${todo.description}`} >
                Describe Todo ID = {todo.id}
            </a><br /><br />
            <h3>Updating an Item in an Array</h3>
            <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`} >
                Update Title to {todo.title}
            </a>
            <h3>Deleting from an Array</h3>
            <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a><br />
            <h3>Creating new Items in an Array</h3>
            <a className="btn btn-primary" href={`${API}/create`}>
                Create Todo
            </a><br />
            <h4>Retrieving Arrays</h4>
            <a className="btn btn-primary" href={API}>
                Get Todos
            </a>
            <h4>Retrieving an Item from an Array by ID</h4>
            <a className="btn btn-primary" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <h3>Filtering Array Items</h3>
            <a className="btn btn-primary" href={`${API}?completed=true`}>
                Get Completed Todos
            </a><br /><br />
        </div>
    );
}
export default WorkingWithArrays;