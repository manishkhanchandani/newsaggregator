import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      {' '}
      <h1>Home2</h1>
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Home;
