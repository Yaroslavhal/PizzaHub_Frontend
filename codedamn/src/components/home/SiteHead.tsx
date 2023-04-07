import { Link, useNavigate } from 'react-router-dom';

function Authorized(){
    if (localStorage.getItem('JwtToken') != null){
        return true;
    }
    return false;
}



const SiteHead = () =>{ 
    
    function LoginOrAccount(){
        if (Authorized()){
            return(
                <Link to={"/account"} className="site-header-item">ACCOUNT</Link>
            )
        }
        else{
            return(
                <Link to={"/login"} className="site-header-item">LOG IN</Link>
            )
        }
    }
    const navigate = useNavigate();

    function handleClick() {
        if(!Authorized())
            navigate("/login");
        else
            navigate("/bag");

    }

    return (
        <div>
            <div className="site-header">
                <Link to={'/'}><div className="site-logo">PIZZA<span style={{color: "firebrick"}}>HUB™</span></div></Link>
                <Link to={"/menu"} style={{marginLeft: "auto"}} className="site-header-item">MENU</Link>
                <Link to={"/sales"} className="site-header-item">SPECIAL DEALS</Link>
                <Link to={"/about"} className="site-header-item">ABOUT US</Link>
                <div onClick={handleClick} className="site-header-item">BAG</div>
                {LoginOrAccount()}
            </div>
        </div>
    );
}

export default SiteHead;