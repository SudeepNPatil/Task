import React, { useState } from 'react';
import LoadingModal from '../modals/modalloading';
import Modal from '../modals/modal';
import { Link } from 'react-router-dom';

export default function signup() {
  const [loding, setloading] = useState(false);
  const [infomodal, setinfomodal] = useState(false);
  const [signupdata, setsignupdata] = useState({
    Name: '',
    password: '',
    Number: '',
    Email: '',
  });

  const [info, setinfo] = useState({});

  const handlechnage = (e) => {
    setsignupdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupdata),
      });

      const result = await response.json();
      setloading(false);
      setinfo(result);
      setinfomodal(true);
      console.log('Server Response:', result);
    } catch (error) {
      console.error('Error:', error);
      setloading(false);
      setinfo(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-auto my-10 gap-5">
      <h1 className="font-bold text-4xl text-center">
        Collaborative Task Manager
      </h1>
      <h1 className="text-center font-bold text-3xl">sign up</h1>
      <div className="flex flex-col gap-3 w-[40vw] border p-12 rounded-lg shadow-lg">
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          id="Name"
          name="Name"
          value={signupdata.Name}
          className="outline-none  h-12 rounded-lg pl-5 border"
          placeholder="Enter Name"
          onChange={handlechnage}
        />

        <label htmlFor="Email">Email</label>
        <input
          type="text"
          id="Email"
          name="Email"
          value={signupdata.Email}
          className="outline-none  h-12 rounded-lg pl-5 border"
          placeholder="Enter Email"
          onChange={handlechnage}
        />

        <label htmlFor="Number">Phone Number</label>
        <input
          type="number"
          id="Number"
          name="Number"
          value={signupdata.Number}
          className="outline-nonew-[40vw] h-12 rounded-lg pl-5 border"
          placeholder="Enter phone Number"
          onChange={handlechnage}
        />

        <label htmlFor="password">Create password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={signupdata.password}
          className="outline-none  h-12 rounded-lg pl-5 border"
          placeholder="create password"
          onChange={handlechnage}
        />

        <button
          onClick={handlesubmit}
          className="bg-blue-600 rounded-lg text-center  h-12 text-black hover:bg-blue-800"
        >
          sign up
        </button>
      </div>

      <Modal isOpen={infomodal} onClose={() => setinfomodal(false)}>
        <div className="flex flex-col gap-10">
          <p className="text-2xl font-bold text-center">{info.message}</p>
          <Link
            to="/login"
            className="h-10 block text-center pt-2 rounded-lg bg-blue-500"
          >
            Go to login
          </Link>
        </div>
      </Modal>

      <LoadingModal isOpen={loding}></LoadingModal>
    </div>
  );
}
