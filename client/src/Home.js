import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-container">
      <section className='header'>
        <h1>Welcome to Tech Manager</h1>
        <p>Your one-stop solution for managing technicians, specializations, and projects.</p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Effortlessly manage technicians and their details.</li>
          <li>Organize and categorize specializations for your projects.</li>
          <li>Create and track projects with ease.</li>
        </ul>
      </section>

      <section className="get-started">
        <h2>Get Started</h2>
        <p>Ready to streamline your workflow? Get started now!</p>
        <div className='buttons'>
          <Link to="/technicians">
            <button className="btn">Manage Technicians</button>
          </Link>
          <Link to="/specializations">
            <button className="btn">Explore Specializations</button>
          </Link>
          <Link to="/projects">
            <button className="btn">Start a New Project</button>
          </Link>
        </div>
      </section>

      <section className="about">
        <h4>About Us</h4>
        <p>
          Tech Manager is designed to simplify the management of technical resources and projects.
          Our platform offers an intuitive interface to handle all your technical requirements efficiently.
        </p>
      </section>
    </div>
  );
};

export default Home