import { relative } from 'path';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useRef  } from "react";
import './auth.css';
import axios from "axios";

const reset = async (data: IConfirm) => {
    const response = await axios.post("https://localhost:7048/confirmAccount", data);
    alert(`Account Confirmed`);
};

interface IConfirm {
    userId: string|null,
    token: string|null,
  }


const ConfirmAccount = () => {
    let [searchParams] = useSearchParams();

    const [state, setState] = useState<IConfirm>({
        userId: searchParams.get("userId"),
        token: searchParams.get("code"),
      });
      console.log("Model : ", state);

    const handleConfirm = () => {
      try
        {        
            reset(state);
        }
        catch(error)
        {
          alert(error);
        }
      };

      handleConfirm();

    return(
        <div className="banner-background">
            <img style={{width: "100%", height: "800px", position: "absolute", zIndex: -1}} src={require("..\\src\\components\\images\\wooden_background.jpg")}></img>
            <div className='auth-frame'>
                <div className='logo'>PIZZA<span style={{color: "firebrick"}}>HUB™</span></div>
                <div style={{fontWeight: "normal"}} className='logo'>Account Confirmed</div>
                <Link to={"/login"} style={{width: "30%", display: "block"}} className='submit-btn'>LOGIN</Link>
            </div>
        </div>
        );
}

export default ConfirmAccount;