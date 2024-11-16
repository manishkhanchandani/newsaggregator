import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link to="/home2">Home2</Link>
      </div>
    </div>
  );
};

export default Home;
