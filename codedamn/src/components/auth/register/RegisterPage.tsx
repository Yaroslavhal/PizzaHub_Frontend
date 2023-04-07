import { relative } from 'path';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef  } from "react";
import '../auth.css';
import axios from "axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    async function handleSubmit(){
        try
        {
            await axios.post("https://localhost:7048/register",
            {
               firstName: firstNameValue,
               lastName: lastNameValue,
               email: emailValue,
               password: passwordValue,
               confirmPassword: password2Value
            }).then((resp)=>{
               alert("Registered successfully");
               navigate("/login");
            });
        }
        catch(error){
            alert(error);
        }
    }





    const [inputType, setInputType] = useState<string>('password');
    const [input2Type, setInput2Type] = useState<string>('password');

    const handleClick = () => { 
        setInputType(inputType === 'password' ? 'text' : 'password');
      };

    const handleClick2 = () => {
        setInput2Type(input2Type === 'password' ? 'text' : 'password');
    };

    const [emailValue, setEmailtValue] = useState<string>('');
    const [firstNameValue, setfirstNameValue] = useState<string>('');
    const [lastNameValue, setlastNameValue] = useState<string>('');
    const [passwordValue, setPasswordtValue] = useState<string>('');
    const [password2Value, setPassword2tValue] = useState<string>('');

    
    
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailtValue(event.target.value);
      };
      const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setfirstNameValue(event.target.value);
      };
      const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setlastNameValue(event.target.value);
      };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordtValue(event.target.value);
      };
    const handlePassword2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword2tValue(event.target.value);
    };






    return(
        <div className="banner-background">
            <img style={{width: "100%", height: "800px", position: "absolute", zIndex: -1}} src={require("..\\src\\components\\images\\wooden_background.jpg")}></img>
            <div style={{marginTop: "30px"}} className='auth-frame'>
                <div className='logo'>PIZZA<span style={{color: "firebrick"}}>HUB™</span></div>
                <input onChange={handleEmailChange} id='email-box' className='user-info' type={"email"} placeholder="Email..."></input>
                <input onChange={handleFirstNameChange} id='email-box' className='user-info' type={"email"} placeholder="First Name..."></input>
                <input onChange={handleLastNameChange} id='email-box' className='user-info' type={"email"} placeholder="Last Name..."></input>
                <div className='password-container'> 
                    <img onClick={handleClick} id='eye-btn-1' src={require("..\\src\\components\\images\\eye_icon.png")} className='eye-btn'></img>            
                    <input onChange={handlePasswordChange} value={passwordValue} style={{position: "absolute", margin: 0, left: "15%"}} id='password-box' className='user-info' type={inputType} placeholder="Password..."></input>
                </div>
                <div className='password-container'> 
                    <img onClick={handleClick2} id='eye-btn-1' src={require("..\\src\\components\\images\\eye_icon.png")} className='eye-btn'></img>            
                    <input onChange={handlePassword2Change} value={password2Value} style={{position: "absolute", margin: 0, left: "15%"}} id='password-box2' className='user-info' type={input2Type} placeholder="Password..."></input>
                </div>
                <Link to={'/login'} className='page-link'>I already have an account</Link>
                <div onClick={handleSubmit} className='submit-btn'>Submit</div>
            </div>
        </div>
        );
}

export default RegisterPage;