import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = ({ logout, isAuthenticated }) => {
  return (
    <div>
      <nav className='navbar navbar-expand-md bg-light navbar-light fixed-top'>
        <Link to='/' className='navbar-brand'>
          <img alt='logo' src='' className='nav-brand-image' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#collapsibleNavbar'>
          <span className='navbar-toggler-icon button-nav' />
        </button>
        <div
          className='flex-row-reverse collapse navbar-collapse'
          id='collapsibleNavbar'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>

            {isAuthenticated ? (
              <Fragment>
                <li className='nav-item'>
                  <Link className='nav-link' to='/dashboard'>
                    <span className='hide-sm'>Dashboard</span>{' '}
                  </Link>{' '}
                </li>
                <li onClick={logout} className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    <span className='hide-sm'>Logout</span>{' '}
                    <i className='fas fa-sign-out-alt'> </i>
                  </Link>{' '}
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
