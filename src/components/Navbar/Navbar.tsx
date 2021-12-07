import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

interface NavlinkOwnProps {
  link: string;
  name: string;
}

// Navlink component
const Navlink = (props: NavlinkOwnProps) => {
  const { link, name } = props;
  return (
    <Link to={link}>
      <div className="nav-link-container header4">{name}</div>
    </Link>
  );
};

// Side nav
const Navbar = () => {
  return (
    <div className="navbar-container">
      <Navlink name="Home" link="/" />
      <Navlink name="New item" link="/new" />
    </div>
  );
};

export default Navbar;
