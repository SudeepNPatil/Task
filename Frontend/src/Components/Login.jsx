import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../modals/modal';
import LoadingModal from '../modals/modalloading';

export default function Login() {
  const [loding, setloading] = useState(false);
  const [infomodal, setinfomodal] = useState(false);
  const [info, setinfo] = useState({});

  const [logininfo, setlogininfo] = useState({
    Email: '',
    password: '',
  });

  const handlechnage = (e) => {
    setlogininfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logininfo),
      });

      const result = await response.json();
      setloading(false);
      setinfo(result);
      setinfomodal(true);
      localStorage.setItem('token', result.token);
      console.log('Server Response:', result);
    } catch (error) {
      console.error('Error:', error);
      setloading(false);
      setinfo(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-5">
      <h1 className="font-bold text-4xl text-center">
        Collaborative Task Manager
      </h1>
      <h1 className="text-center font-bold text-3xl">Login</h1>
      <div className="flex flex-col gap-3 w-[40vw] border p-12 rounded-lg shadow-lg">
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          id="Email"
          name="Email"
          value={logininfo.Email}
          className="outline-none  h-12 rounded-lg pl-5 border"
          placeholder="Enter Email"
          onChange={handlechnage}
        />

        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={logininfo.password}
          className="outline-nonew-[40vw] h-12 rounded-lg pl-5 border"
          placeholder="Enter password"
          onChange={handlechnage}
        />

        <button
          onClick={handlesubmit}
          className="bg-blue-600 rounded-lg text-center  h-12 text-black hover:bg-blue-800"
        >
          Login
        </button>

        <p>
          Cant'login?{' '}
          <Link to={'/signup'} className="text-blue-700">
            sign up
          </Link>
        </p>
      </div>

      <Modal isOpen={infomodal} onClose={() => setinfomodal(false)}>
        <div className="flex flex-col gap-10">
          <p className="text-2xl font-bold text-center">
            Welcome {info.message} !
          </p>
          <Link
            to="/taskmanager"
            className="h-10 block text-center pt-2 rounded-lg bg-blue-500"
          >
            Go to main page
          </Link>
        </div>
      </Modal>

      <LoadingModal isOpen={loding}></LoadingModal>
    </div>
  );
}
