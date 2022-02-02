import axios from 'axios';
import { React, useState } from 'react'
import './auth.css'
import Cookies from 'universal-cookie'

export default function Auth() {

    const [auth, setAuth] = useState({ Login: "", Password: "" });
    const [valid, setValid] = useState("");
    const cookies = new Cookies();

    const logIn = () =>{
        axios.post("/token", auth).then(response => response.data)
        .then(data => {
            cookies.set('token', data, { path: '/' });
            window.location.href = '/warehouse';
        })
        .catch(error => {
            setValid(error.response.data.error);
        })
    }

    return (
        <div id='Auth'>
            <div id='AuthBlock'>
                <div className='textTitle'>Авторизация</div>
                <div id="ValidBlock" className='validText'>{valid}</div>
                <div className='authInputBlock'>
                    <div className='inputLabel'>Логин</div>
                    <input autoFocus autoComplete='new-password' className='inputCustom' value={auth.Login} onChange={e => { setAuth({ ...auth, Login: e.target.value }); setValid("");}} />
                </div>
                <div className='authInputBlock'>
                    <div className='inputLabel'>Пароль</div>
                    <input autoComplete='new-password' className='inputCustom' type="password" value={auth.Password} onChange={e => { setAuth({ ...auth, Password: e.target.value }); setValid("");}} />
                </div>
                <div className='authInputBlock' id='AuthButtonBlock'>
                    <div id='AuthButton' onClick={()=> logIn()}>Войти</div>
                </div>
            </div>
        </div>
    )
}
