import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light container_navbar">
      <Link className="navbar-brand logo" to="/">
        Laravel<span>DB</span>
      </Link>
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu} // Call the toggleMenu function on button click
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/departamentos">
                Departamentos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/funcionarios">
                Funcionários
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tarefas">
                Tarefas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
