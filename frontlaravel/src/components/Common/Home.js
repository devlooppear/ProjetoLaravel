import React from 'react';

const Home = () => {
  return (
    <div className='container_home'>
      <div className="card card_home">
        <h2>Welcome to the Home Page</h2>
        <p>This is the home page of my application for Laravel DB.</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="380" height="500" fill="currentColor" class="bi bi-bar-chart-line" viewBox="0 0 16 16">
          <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"/>
        </svg>
      </div>
    </div>
  );
};

export default Home;
