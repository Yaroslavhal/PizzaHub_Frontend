import { relative } from 'path';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef  } from "react";
import '../auth.css';
import axios from "axios";

const reset = async (Email: string) => {
  const data = { email: Email};
  try {
    const response = await axios.post("https://localhost:7048/forgotPassword", data);
    alert(`Mail sent to ${Email}`);
  } catch (error) {
    alert(error);
  }
};




const ResetPasswordPage = () => {
    const [emailValue, setEmailtValue] = useState<string>('');

    
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailtValue(event.target.value);
      };


    const navigate = useNavigate()

    const handleSubmit = () => {
      try
        {
            reset(emailValue);
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
                <div onClick={handleSubmit} className='submit-btn'>Send Mail</div>
                <Link style={{marginTop: "20px"}} to={'/'} className='page-link'>Go Home</Link>
            </div>
        </div>
        );
}

export default ResetPasswordPage;