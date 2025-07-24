import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">🏅 ScoreBoard</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/scoreboard" className={({ isActive }) => isActive ? 'active' : ''}>Leaderboard</NavLink>
        </li>
        <li>
          <NavLink to="/claimpoints" className={({ isActive }) => isActive ? 'active' : ''}>Claim Points</NavLink>
        </li>
       
      </ul>
    </nav>
  );
}

export default Navbar;
