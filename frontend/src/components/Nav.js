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

    function RaiseHand(e) {
        e.preventDefault();

        var timestamp = Date.now();
        timestamp = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
        var user = JSON.parse(localStorage.getItem('user')).name;

        var formData = new FormData();
        formData.append('Timestamp',timestamp);
        formData.append('Name',user)

        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]},${pair[1]}`);
        //   }

        const URL = 'https://script.google.com/macros/s/AKfycbwd2P_htjEqgOllrLlaNhp3qkEv6eCJh3RuweXYbxaSuQM57_HO6Sp3FTGZ7pFeDNE/exec';

        fetch(URL, {
            method: "POST",
            body: formData,
        }).then((res) => res.json()).then((data) => {
            console.log(data)
        }).catch((error) => console.log(error))
    }

    return (
        <div className='nav'>
            <img alt={logo} className='logo' src={logo} />
            {
                auth ? <ul className='nav-ul'>
                    <li id='eventHead' ><Link to='/ticket'>Technical Tambola MUACM</Link></li>
                    <li>
                        <button id='logout' >
                            <Link onClick={logout} to='/login'>Logout ({JSON.parse(auth).name})</Link>
                        </button>
                    </li>
                    <li id='handRaise'>
                        <button onClick={(e) => RaiseHand(e)} id='handRaiseButton' type='button'>✋</button>
                    </li>
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