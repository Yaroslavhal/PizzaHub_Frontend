import axios from "axios";
import { request } from "http";
import { url } from "inspector";
import { useEffect, useState } from "react";
import "./css/home.css";
import { Link, useAsyncValue, useNavigate  } from 'react-router-dom';
import { CompletionInfoFlags } from "typescript";
import { InputType } from "zlib";




interface IProductItem{
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    salePrice: number,
    subcategory: string,
    isDelete: boolean
} 

interface ISubcategoryItem{
    id: number,
    name: string,
    category: string,
    products: IProductItem[],
    isDelete: boolean
}

interface ICategoryItem{
    id: number,
    name: string,
    subcategories: ISubcategoryItem[],
    isDelete: boolean
}
 



const HomePage = () =>{
    const navigate = useNavigate(); 
    async function AddToOrder(value: string){
         
        if (localStorage.getItem('JwtToken') !== null)
        {
            let id = value.slice(3);
            let itemCount = (document.getElementById("cnt"+id) as HTMLInputElement).value;
            console.log("id - " + id + ", count - " + itemCount);
            try
            {
                await axios.post("https://localhost:7048/AddToBag", {
                productId: id,
                count: itemCount,
                jwt: localStorage.getItem('JwtToken')
                });
                alert("Added to bag");
            }
            catch(error){
                alert(error);
            };
            
        }
        else{
            navigate("/login");
        }
    }

    const [categories, setCategories] = useState<Array<ICategoryItem>>([]);

    const [deals, setDeals] = useState<Array<IProductItem>>([]);


    useEffect(() => {
      
        axios.get<Array<ICategoryItem>>('https://localhost:7048/Categories').then(resp => {
            setCategories(resp.data);
        });

        axios.get<Array<IProductItem>>('https://localhost:7048/Deals').then(resp => {
            setDeals(resp.data);
        });
    
    }, []);

    function GetBanner(){
        let product = deals.filter(x => x.isDelete == false).find(x => x.salePrice != 0);

        return(
            <div className="banner-background">
                <img style={{width: "100%", height: "800px", position: "absolute", zIndex: -1}} src={require('../images/wooden_background.jpg')}></img>
                    <div style={{textAlign: "center"}}>
                        <img 
                        style={{
                            marginTop: "50px",
                            height: "500px",
                            width: "500px",
                        }} 
                        src={product?.image}>
                        </img>
                        <br></br>
                        <div className="banner-text-header">{product?.name}</div>
                        <div style={{fontSize: "30px", color: "white"}}>Just For {product?.salePrice}$</div>
                        <Link to={'/sales'} className="banner-add-to-order">See Other Deals</Link>
                    </div>
            </div>   );
    }

    let menu_content = categories.map(category =>{
        return(
            
            <div key={category.id} style={{textAlign: "center", width: "100%", padding: "30px", }}>
                <div style={{backgroundColor: "firebrick", display: "block", height: "3px", width: "82%", margin: "100px 9%"}}></div>
            <div className="banner-text-header" style={{color: "black", fontSize: "70px", marginTop: "40px"}}>{category.name}</div>
            {
                category.subcategories.filter(x => x.isDelete == false).map(subcategory =>{
                    return(                       
                        <div key={subcategory.id}><div className="banner-text-header" style={{color: "black", fontSize: "45px", marginTop: "40px"}}>{subcategory.name}</div>
                            {
                                subcategory.products.filter(x => x.isDelete == false).slice(0,3).map(product =>{
                                    return(
                                        <>
                                        <table key={product.id} className="menu-list">
                                            <tbody>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                                <tr>
                                                    <td><img className="menu-item-photo" src={product.image}></img></td>
                                                    <td style={{fontSize: "50px"}} className="menu-item-text">{product.name}</td>
                                                    <td className="menu-item-text">{product.description}</td>
                                                    <td className="menu-item-text">
                                                    {
                                                        GetPrice(product)  
                                                    }
                                                    </td>
                                                    <td><input id={"cnt"+product.id} defaultValue={1} min={1} max={50} className="count-box" type={"number"}></input></td>
                                                    <td><a id={"btn" + product.id} onClick={(e)=> {AddToOrder((e.target as HTMLInputElement).id) }} className="add-to-bag-btn">Add To Order</a></td>
                                                </tr>
                                            </tbody>
                                           </table>
                                            <div style={{backgroundColor: "black", display: "block", height: "3px", width: "40%", margin: "100px 30%"}}></div>

                                        </>
                                        
                                    )
                                })
                            }</div>
                        )
                })
            }
        </div>
        )
    });

    
    function GetPrice(product: IProductItem){
        if (product.salePrice != 0){
            return <div> <div style={{textDecoration: "line-through"}}>{product.price}$</div><div style={{color: "firebrick"}}>{product.salePrice}$</div></div>
 
        }
        else{
            return <div><div>{product.price}$</div></div>
        }
    }


    return (
        <>
        {GetBanner()}
        <div className="banner-text-header" style={{color: "black", fontSize: "70px", marginTop: "40px", textAlign: "center"}}>Most Popular Items</div>
        {menu_content}
        </>
    );
    }

export default HomePage;