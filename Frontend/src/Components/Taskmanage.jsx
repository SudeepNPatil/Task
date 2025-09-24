/* import React from 'react';
import { useState } from 'react';

export default function Taskmanage() {
  const [create, setcreate] = useState(false);
  const [task, settask] = useState({
    task1: '',
  });
  const handlecreate = (e) => {
    e.preventDefault();
    setcreate(true);
  };

  const handlechange = (e) => {
    info((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
    <div className="flex flex-col bg-green-200 h-screen relative">
      {create ? (
        <div className="flex flex-col justify-center self-center gap-2 mt-40">
          <label htmlFor="text" className="text-lg font-semibold">
            Create task
          </label>
          <input
            type="text"
            name="task"
            value={task.task1}
            className="w-[20vw] h-12 border rounded-sm pl-5"
          />
          <button className="text-center bg-blue-500 h-12 w-[20vw] rounded-xl">
            Create
          </button>
        </div>
      ) : (
        ''
      )}

      <div className="flex flex-col gap-10 absolute right-10 top-10">
        <button
          onClick={handlecreate}
          className="text-white bg-blue-500 rounded-lg w-full h-12 px-10 hover:bg-blue-700"
        >
          Create task
        </button>

        <button className="text-white bg-blue-500 rounded-lg w-full h-12 px-10  hover:bg-blue-700">
          View task
        </button>
      </div>
    </div>
  );
}
 */

import React, { useState, useEffect } from 'react';

export default function TaskManage() {
  const [create, setCreate] = useState(false);
  const [task, setTask] = useState({ task1: '' });
  const [tasks, setTasks] = useState([]); // All tasks
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle creating a task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!task.task1) return alert('Task cannot be empty');

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // if using JWT
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

  return (
    <div className="flex flex-col bg-green-200 min-h-screen relative p-10">
      {/* Create Task Form */}
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

      {/* Task List */}
      {tasks.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          <ul className="flex flex-col gap-3">
            {tasks.map((t, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                {t.task1 || t.task} {/* adjust based on backend field */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sidebar Buttons */}
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

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          <style>
            {`
              .loader {
                border-top-color: #3498db;
                animation: spin 1s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
}
