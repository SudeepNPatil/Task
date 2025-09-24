import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import LoadingModal from '../modals/modalloading';

export default function TaskManage() {
  const [create, setCreate] = useState(false);
  const [task, setTask] = useState({ task1: '' });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(task);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!task.task1) return alert('Task cannot be empty');

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(task),
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        setTasks((prev) => [...prev, result.task]);
        setTask({ task1: '' });
        setCreate(false);
      } else {
        alert(result.message);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleViewTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        setTasks(result.tasks);
      } else {
        alert(result.message);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handledelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        alert(data.message || 'Failed to delete task');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="flex flex-col bg-green-200 min-h-screen relative p-10">
      {create && (
        <div className="flex flex-col justify-center self-center gap-2 mt-20 bg-white p-6 rounded shadow-lg">
          <label htmlFor="task" className="text-lg font-semibold">
            Create Task
          </label>
          <input
            type="text"
            name="task1"
            value={task.task1}
            onChange={handleChange}
            className="w-[20vw] h-12 border rounded-sm pl-5"
            placeholder="Enter task..."
          />
          <button
            onClick={handleCreateTask}
            className="text-white bg-blue-500 h-12 w-[20vw] rounded-xl mt-2 hover:bg-blue-700"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      )}

      {tasks.length > 0 ? (
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          <ul className="flex flex-col gap-3">
            {tasks.map((t) => {
              return (
                <li
                  key={t._id}
                  className="bg-white p-4 rounded shadow flex justify-between items-center"
                >
                  {t.task1 || t.task}{' '}
                  <MdDelete
                    onClick={() => handledelete(t._id)}
                    className="text-2xl cursor-pointer"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <h1 className="text-4xl text-center mt-52">No task are there</h1>
      )}

      <div className="flex flex-col gap-4 absolute right-10 top-10">
        <button
          onClick={() => setCreate(true)}
          className="text-white bg-blue-500 rounded-lg w-full h-12 px-10 hover:bg-blue-700"
        >
          Create Task
        </button>

        <button
          onClick={handleViewTasks}
          className="text-white bg-blue-500 rounded-lg w-full h-12 px-10 hover:bg-blue-700"
        >
          View Tasks
        </button>
      </div>

      <LoadingModal isOpen={loading}></LoadingModal>
    </div>
  );
}
