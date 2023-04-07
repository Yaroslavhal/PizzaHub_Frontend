import { relative } from 'path';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef  } from "react";
import axios from "axios";
import { parseCommandLine } from 'typescript';


interface IUserItem{
    id: number,
    email: string,
    firstName: string,
    lastName: string,
}

const reset = async (Email: string) => {
    const data = { email: Email};
    try {
      const response = await axios.post("https://localhost:7048/forgotPassword", data);
      alert(`Mail sent to ${Email}`);
    } catch (error) {
      alert(error);
    }
  };
  
  
  const AccountPage = () => {
      const [emailValue, setEmailValue] = useState<string>('');
      const [firstName, setFirstName] = useState<string>('');
      const [lastName, setLastName] = useState<string>('');

      const [user, setUser] = useState<IUserItem>();
      
      
      const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setEmailValue(event.target.value);
        };

      const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setFirstName(event.target.value);
        };

      const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setLastName(event.target.value);
        };

        async function GetUser()
        {
            const request = { data: localStorage.getItem('JwtToken') };
            await axios.post("https://localhost:7048/GetUser", request).then((resp) =>{
            setUser(resp.data);
            console.log(resp.data);
            setEmailValue(resp.data.email);
            setFirstName(resp.data.firstName);
            setLastName(resp.data.lastName);
            });

        }
        useEffect(() => {
            GetUser();
          }, []);

        async function handleSubmit() {
            const u: IUserItem = 
            { 
                id: 0, 
                email: emailValue,
                firstName: firstName,
                lastName: lastName
            };
            console.log(u);
            const request = { jwt: localStorage.getItem('JwtToken') };

            await axios.post("https://localhost:7048/UpdateUser",
             {
                jwt: localStorage.getItem('JwtToken'),
                user: u
            }).then((resp)=>{
                const token = resp.data.token;
                localStorage.setItem('JwtToken', token.result);
                navigate("/");
            });
        };
        const navigate = useNavigate();

        const logOut = () =>{
            localStorage.removeItem("JwtToken");
            navigate("/");
        }


        function ChangePassword(){
            reset(user?.email + "");
        }
  
      return(
        
          <div style={{height: "900px"}} className="banner-background">
              <img style={{width: "100%", height: "900px", position: "absolute", zIndex: -1}} src={require("..\\src\\components\\images\\wooden_background.jpg")}></img>
              <div style={{marginTop: "20px" }} className='auth-frame'>
                  <div className='logo'>PIZZA<span style={{color: "firebrick"}}>HUB™</span></div>
                  <div style={{fontSize: "35px"}}>Email</div>
                  <input value={emailValue} onChange={handleEmailChange} id='email-box' className='user-info' type={"email"} placeholder="Email..."></input>
                  <div style={{fontSize: "35px"}}>First Name</div>
                  <input value={firstName} onChange={handleFirstNameChange} id='email-box' className='user-info' type={"text"} placeholder="John..."></input>
                  <div style={{fontSize: "35px"}}>Last Name</div>
                  <input value={lastName} onChange={handleLastNameChange} id='email-box' className='user-info' type={"text"} placeholder="Smith..."></input>
                  <div style={{backgroundColor: "green", width: "60%"}} onClick={handleSubmit} className='submit-btn submit-green'>Submit Changes</div>
                  <div onClick={logOut} className='submit-btn'>Log Out</div>
                  <div onClick={ChangePassword} style={{width: "60%"}} className='submit-btn'>Change Password</div>
              </div>
          </div>
          );
  }
  
  export default AccountPage;