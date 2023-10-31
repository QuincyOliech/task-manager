import React from 'react';
import TaskImage from '../assets/images/taskimage3.svg';

const LandingPage = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full min-h-screen">
      <div className="lg:w-1/2 p-4 lg:p-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-semibold mb-4">
          Streamline Your Tasks with Our Powerful Task Manager
        </h1>
        <p className="text-base text-gray-500 mb-4">
          Discover an innovative solution for efficient task management. Easily organize, prioritize, and optimize your daily to-dos, enhancing your productivity.
        </p>
        <a href="/register"  className="bg-custom-blue hover:bg-blue-500 text-white font-semibold  p-3 rounded m-4">
          Get Started
        </a>
      </div>
      <div className="w-full lg:w-1/2 text-center ">
        <img
          src={TaskImage}
          alt="Task Image"
          className="w-full lg:max-w-xl mx-auto mt-4 lg:mt-0 object-contain"
        />
      </div>
    </div>
  );
};

export default LandingPage;
