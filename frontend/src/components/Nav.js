import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div>
            <img alt="logo" className='logo' src='https://ik.imagekit.io/3q71ttwh2xv/Research/logo_q2e-oFCdX.png?updatedAt=1640679761157'/>
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