import SiteHead from "../home/SiteHead";
import SiteFooter from "../home/SiteFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from 'lodash';
import { Link } from "react-router-dom";

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
  products: IProductItem[]
}

interface ICategoryItem{
  id: number,
  name: string,
  subcategories: ISubcategoryItem[]
}

interface IBagItem{
    id: number,
    product: IProductItem,
    count: number
}

function GetPrice(product: IProductItem){
  if (product.salePrice != 0){
      return <div> <div style={{textDecoration: "line-through"}}>{product.price}$</div><div style={{color: "firebrick"}}>{product.salePrice}$</div></div>

  }
  else{
      return <div><div>{product.price}$</div></div>
  }
}


const getFInalPrice = async (Jwt: string) => {
    const data = { Jwt };
    try {
      const response = await axios.post("https://localhost:7048/GetFullPrice", data);
      const result = response.data;
      return result;
    } catch (error) {
      alert(error);
    }
  };


function BagPage(){



async function DeleteItem (value: string){
    if (localStorage.getItem('JwtToken') !== null)
        {
            let pr_id = value.slice(3);
            let itemCount = (document.getElementById("cnt"+pr_id) as HTMLInputElement).value;
            console.log("id - " + pr_id + ", count - " + itemCount);
            try
            {
                await axios.post("https://localhost:7048/DeleteBagItem", {
                id: pr_id,
                jwt: localStorage.getItem('JwtToken')
                });
                let parent = document.getElementById(value)?.parentNode?.parentNode;
                parent?.parentNode?.removeChild(parent);
                alert("Item Removed From Bag");
            }
            catch(error){
                alert(error);
            };
            
        }
}

async function ChangeCount(value: string){
    let itemCount = (document.getElementById(value) as HTMLInputElement).value;
    (document.getElementById(value) as HTMLInputElement).value = itemCount;
    try
    {
        await axios.post("https://localhost:7048/ChangeBagItemCount", {
        id: value.slice(3),
        count: itemCount,
        jwt: localStorage.getItem('JwtToken')
        });
        axios.post("https://localhost:7048/GetFullPrice", { data: localStorage.getItem("JwtToken")}).then((resp)=>{
          setPrice(resp.data);
        });
    }
    catch(error){
        alert(error);
    };
}
  
const [bagItems, setBagItems] = useState<Array<IBagItem>>([]);
const [price, setPrice] = useState<number>(0);

useEffect(() => {

  axios.post<Array<IBagItem>>('https://localhost:7048/GetBagItems', {
    jwt: localStorage.getItem("JwtToken")
  }).then(resp => {
    setBagItems(resp.data);
  });
  axios.post("https://localhost:7048/GetFullPrice", { data: localStorage.getItem("JwtToken")}).then((resp)=>{
    setPrice(resp.data);
  });

}, []);




let menu_content =
    bagItems.map(item =>{
        return(
            <table key={item.id} className="menu-list">
                <tbody>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td><img className="menu-item-photo" src={item.product.image}></img></td>
                        <td style={{fontSize: "50px"}} className="menu-item-text">{item.product.name}</td>
                        <td className="menu-item-text">{item.product.description}</td>
                        <td className="menu-item-text">
                        {
                            GetPrice(item.product)  
                        }
                        </td>
                        <td><input id={"cnt"+item.id} onChange={(e)=> {ChangeCount((e.target as HTMLInputElement).id) }} defaultValue={item.count} min={1} max={50} className="count-box" type={"number"}></input></td>
                        <td><a id={"btn" + item.id} onClick={(e)=> {DeleteItem((e.target as HTMLInputElement).id) }} className="add-to-bag-btn">Delete Item</a></td>
                    </tr>
                </tbody>
                
            </table>
        )
    });

    return (
      <>
      <div style={{marginTop: "80px"}}></div>
        {menu_content} 
        <div style={{backgroundColor: "firebrick", display: "block", height: "3px", width: "82%", margin: "100px 9%"}}></div>
        <div style={{height: "100px"}}></div> 
        <div style={{fontSize: "60px",  width: "100%", textAlign: "center"}} className="menu-item-text">Sum:</div>
        <div style={{fontSize: "60px", margin: " 0 0 100px 0", width: "100%", textAlign: "center"}} className="menu-item-text">{price}$</div>
        <div style={{width: "100%", textAlign: "center"}}>
            
            <Link to={"/pay"} className="make-order">Make Order</Link>
        </div>
      </>
    );
}

export default BagPage;