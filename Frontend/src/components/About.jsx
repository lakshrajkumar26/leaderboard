import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">📋 About This Project</h1>
      <p className="about-intro">
        This project was completed as part of an internship selection task. It involved designing and developing a real-time, dynamic **Leaderboard System** using the MERN stack (MongoDB, Express, React, Node.js).
      </p>

      <section className="about-section">
        <h2>🎯 Task Objective</h2>
        <ul>
          <li>Select from 10 users and claim random points (1–10).</li>
          <li>Dynamic leaderboard updates based on total points.</li>
          <li>Store point claims and maintain history in MongoDB.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>🛠️ Features</h2>
        <ul>
          <li>User dropdown with add-user functionality</li>
          <li>Claim button awards random points</li>
          <li>MongoDB collections: Users & ClaimHistory</li>
          <li>Real-time leaderboard ranking</li>
          <li>Claim history logging on every point claim</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>🔧 Tech Stack</h2>
        <ul>
          <li><strong>Frontend:</strong> ReactJS + CSS (Responsive, Modern UI)</li>
          <li><strong>Backend:</strong> Node.js + Express.js</li>
          <li><strong>Database:</strong> MongoDB with Mongoose ODM</li>
          <li><strong>Real-Time:</strong> Updates triggered after each claim</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>📌 Backend Logic</h2>
        <p>
          - Users are stored with total points.  
          - On claim, server generates a random number (1–10) and updates the selected user.  
          - A new document is inserted into `ClaimHistory` for tracking.  
          - Rankings are recalculated by sorting users in descending order of points.
        </p>
      </section>

      <section className="about-section">
        <h2>🎨 UI Highlights</h2>
        <ul>
          <li>Game-inspired modern design</li>
          <li>Animated leaderboard with rank badges 🥇🥈🥉</li>
          <li>Clean typography and mobile responsiveness</li>
          <li>CSS animations (e.g., polish flash on text)</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>✅ Completed Within</h2>
        <p>🕒 2 Days (as per internship deadline)</p>
      </section>

      <section className="about-section">
        <h2>🙋‍♂️ Developed by</h2>
        <p><strong>Laksh Raj Kumar</strong> — Full Stack Developer</p>
      </section>
    </div>
  );
};

export default About;
