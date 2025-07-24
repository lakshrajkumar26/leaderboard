// import React from 'react'
// import './Home.css'
// const Home = () => {
//   return (
//     <div className="landing-container">
//       <div className="overlay">
//         <div className="landing-content">
//           <h1 className="title">🏆 Welcome to TaskPlanet</h1>
//           <p className="subtitle">
//             Track. Compete. Win. <br />
//             Your ultimate real-time scoreboard system.
//           </p>
//           <button className="cta-btn" onClick={() => window.location.href = "/scoreboard"}>
//             Get Started
//           </button>

         
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home

import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">🎮 TaskPlanet</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/scoreboard">Scoreboard</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>

      <div className="overlay">
        <div className="landing-content">
          <h1 className="title">🏆 Welcome to TaskPlanet</h1>
          <p className="subtitle">
            Track. Compete. Win. <br />
            Your ultimate real-time scoreboard system.
          </p>
          <button className="cta-btn" onClick={() => window.location.href = "/scoreboard"}>
            Get Started
          </button>
        </div>

        <p className="credit">✨ Designed by <span className="name-flash">Laksh Raj Kumar</span></p>
      </div>
    </div>
  );
};

export default Home;
