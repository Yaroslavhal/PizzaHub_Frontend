import { relative } from 'path';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef  } from "react";
import '../auth.css';
import axios from "axios";

const login = async (Email: string, Password: string) => {
  const data = { email: Email, password: Password };
  try {
    const response = await axios.post("https://localhost:7048/login", data);
    const token = response.data.token;
    localStorage.setItem('JwtToken', token.result)
    // store the token in localStorage or a cookie
  } catch (error) {
    alert(error);
  }
};




const LoginPage = () => {
    const [inputType, setInputType] = useState<string>('password');
    const [emailValue, setEmailtValue] = useState<string>('');
    const [passwordValue, setPasswordtValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailtValue(event.target.value);
      };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordtValue(event.target.value);
      };

    const handleClick = () => {
      setInputType(inputType === 'password' ? 'text' : 'password');
    };

    const navigate = useNavigate()

    const handleSubmit = () => {
      try
        {
          login(emailValue, passwordValue).then(()=>{
            navigate("/");
          })
        }
        catch(error)
        {
          alert(error);
        }
      };

    return(
        <div className="banner-background">
            <img style={{width: "100%", height: "800px", position: "absolute", zIndex: -1}} src={require("..\\src\\components\\images\\wooden_background.jpg")}></img>
            <div className='auth-frame'>
                <div className='logo'>PIZZA<span style={{color: "firebrick"}}>HUB™</span></div>
                <input onChange={handleEmailChange} id='email-box' className='user-info' type={"email"} placeholder="Email..."></input>
                <div className='password-container'> 
                    <img onClick={handleClick} id='eye-btn-1' src={require("..\\src\\components\\images\\eye_icon.png")} className='eye-btn'></img>            
                    <input onChange={handlePasswordChange} value={passwordValue} style={{position: "absolute", margin: 0, left: "15%"}} id='password-box' className='user-info' type={inputType} placeholder="Password..."></input>
                </div>
                <Link to={'/register'} className='page-link'>I don't have an account</Link>
                <div onClick={handleSubmit} className='submit-btn'>Submit</div>
                <Link style={{marginTop: "20px"}} to={'/resetPass'} className='page-link'>Forgot Password</Link>

            </div>
        </div>
        );
}

export default LoginPage;