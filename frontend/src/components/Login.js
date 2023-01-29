import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

const Login=()=>{
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/ticket')
        }
    },[])

    const handlelogin=async()=>{
        let result = await fetch('https://tambola-backend.vercel.app/login',{
            method:'POST',
            body:JSON.stringify({user,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        if(result.name){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/ticket');
        }
        else{
            alert("Please enter correct deatils...")
        }
    }

    return(
        <div className='login'>
            <h1 id='eventName'>Technical Tambola</h1>
            <h1 id='login'>Log In</h1>
            <input className='inputBox' type='text' value={user} 
            onChange={(e)=>setUser(e.target.value)} placeholder='Enter User ID'/>

            <input className='inputBox' type='password' value={password}
            onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/>

            <button onClick={handlelogin} className='button' type='button'>Login</button>
        </div>
    )
}

export default Login;