// src/components/NavBar.tsx

import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav style={{ top: "5rem" }}>
      <ul style={{ display: "flex", flexDirection: "row" }}>
        <li style={{ marginRight: "4rem" }}>
          <Link to="/login">Login</Link>
        </li>
        <li style={{ marginRight: "4rem" }}>
          <Link to="/signUp">Sign Up</Link>
        </li>
        <li style={{ marginRight: "4rem" }}>
          <Link to="/passRecovery">Recovery</Link>
        </li>
        <li style={{ marginRight: "4rem" }}>
          <Link to="/personalInfo">Personal Info</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default NavBar;
