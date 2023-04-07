import { relative } from 'path';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useRef  } from "react";
import '../auth.css';
import axios from "axios";

const reset = async (data: ChangePasswrodForm) => {
    const response = await axios.post("https://localhost:7048/changePassword", data);
    alert(`Password updated successfully`);
};

interface ChangePasswrodForm {
    userId: string|null,
    token: string|null,
    password: string;
    confirmPassword: string;
  }


const MakeResetPassword = () => {
  const [passwordValue, setPasswordtValue] = useState<string>('');
  const [password2Value, setPassword2tValue] = useState<string>('');

  const [inputType, setInputType] = useState<string>('password');
  const [input2Type, setInput2Type] = useState<string>('password');

  const handleClick = () => { 
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

const handleClick2 = () => {
    setInput2Type(input2Type === 'password' ? 'text' : 'password');
};


const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setPasswordtValue(event.target.value);
};
const handlePassword2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
  setPassword2tValue(event.target.value);
};

    let [searchParams] = useSearchParams();

    const [state, setState] = useState<ChangePasswrodForm>({
        userId: searchParams.get("userId"),
        token: searchParams.get("code"),
        password: "",
        confirmPassword: ""
      });
      console.log("Model : ", state);

    const navigate = useNavigate()

    const handleSubmit = () => {
      try
        {
            let value: ChangePasswrodForm = {
              userId: state.userId,
              token: state.token,
              password: passwordValue,
              confirmPassword: password2Value
            }
            reset(value);
            if (localStorage.getItem("JwtToken") === null)
              navigate("/login");
            else
            navigate("/account");
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
                <div className='password-container'> 
                    <img onClick={handleClick} id='eye-btn-1' src={require("..\\src\\components\\images\\eye_icon.png")} className='eye-btn'></img>            
                    <input onChange={handlePasswordChange} value={passwordValue} style={{position: "absolute", margin: 0, left: "15%"}} id='password-box' className='user-info' type={inputType} placeholder="Password..."></input>
                </div>
                <div className='password-container'> 
                    <img onClick={handleClick2} id='eye-btn-1' src={require("..\\src\\components\\images\\eye_icon.png")} className='eye-btn'></img>            
                    <input onChange={handlePassword2Change} value={password2Value} style={{position: "absolute", margin: 0, left: "15%"}} id='password-box2' className='user-info' type={input2Type} placeholder="Password..."></input>
                </div>
                <div onClick={handleSubmit} style={{width: "60%"}} className='submit-btn'>Save Password</div>
                <Link style={{marginTop: "20px"}} to={'/'} className='page-link'>Go Home</Link>
            </div>
        </div>
        );
}

export default MakeResetPassword;