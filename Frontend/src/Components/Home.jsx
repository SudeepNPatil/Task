import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-50 gap-10">
      <h1 className="text-5xl font-bold text-center">
        Collaborative Task Manager
      </h1>

      <Link
        to={'/login'}
        className="text-center block w-[20%] bg-gray-700 pt-3 rounded-lg text-white h-12 hover:bg-gray-800"
      >
        Login
      </Link>
      <Link
        to={'/signup'}
        className="text-center block w-[20%] pt-3 bg-gray-700 rounded-lg text-white h-12 hover:bg-gray-800"
      >
        sign up
      </Link>
    </div>
  );
}
