import { relative } from 'path';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, CSSProperties   } from "react";
import '../auth/auth.css';
import axios from "axios";
import { convertToObject } from 'typescript';

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




const PayingForm = () => {
    const [emailValue, setEmailtValue] = useState<string>('');
    const [dateValue, setDatetValue] = useState<Date>();
    const [cvvValue, setCvvtValue] = useState<string>();
    const [price, setPrice] = useState<number>();

    useEffect(() => {
        axios.post("https://localhost:7048/GetFullPrice", { data: localStorage.getItem("JwtToken")}).then((resp)=>{
          setPrice(resp.data);
        });
      
      }, []);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailtValue(event.target.value);
      };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailtValue(event.target.value);
      };
      
    const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCvvtValue(event.target.value);
      };

      
      const HandleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const lastChar = inputValue.charAt(inputValue.length - 1);
        if (lastChar < "0" || lastChar > "9"){
            event.target.value = inputValue.slice(0, -1);
        }
      }

    const handleSubmit = () => {
      try
        {

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
                <input onChange={HandleInput} className='user-info' type={"text"} placeholder="Card Number..."></input><br></br>
                <input className='user-info' type={"date"} style={{width: "30%"}} placeholder='Expire Date...'></input><br></br>
                <input onChange={HandleInput} maxLength={3} style={{ width: "20%"}} className='user-info' type={"text"} placeholder='CVV'></input>
                <div onClick={handleSubmit} className='submit-btn'>Pay {price}$</div>              
                <Link style={{marginTop: "20px"}} to={'/bag'} className='page-link'>Back</Link>
            </div>
        </div>
        );
}

export default PayingForm;