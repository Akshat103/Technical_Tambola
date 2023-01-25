import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const logo = require("../images/logo.png")

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div>
            <img alt={logo} className='logo' src={logo}/>
            {
                auth ? <ul className='nav-ul'>
                    <li><Link to='/'>Technical Tambola MUACM</Link></li>
                    <li><Link onClick={logout} to='/login'>Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
            }
        </div>
    )
}

export default Nav;