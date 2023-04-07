import SiteHead from "../home/SiteHead";
import SiteFooter from "../home/SiteFooter";
import { useEffect, useState } from "react";
import axios from "axios";

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

function GetPrice(product: IProductItem){
  if (product.salePrice != 0){
      return <div> <div style={{textDecoration: "line-through"}}>{product.price}$</div><div style={{color: "firebrick"}}>{product.salePrice}$</div></div>

  }
  else{
      return <div><div>{product.price}$</div></div>
  }
}


function MenuPage(){
  
const [categories, setCategories] = useState<Array<ICategoryItem>>([]);
useEffect(() => {
      
  axios.get<Array<ICategoryItem>>('https://localhost:7048/Categories').then(resp => {
      setCategories(resp.data);
  });

}, []);


let menu_content = categories.map(category =>{
  
  return(
    
      <div key={category.id} style={{textAlign: "center", width: "100%", padding: "30px", }}>
        <div style={{backgroundColor: "firebrick", display: "block", height: "3px", width: "82%", margin: "100px 9%"}}></div>
      <div className="banner-text-header" style={{color: "black", fontSize: "70px", marginTop: "40px"}}>{category.name}</div>
      {
          category.subcategories.map(subcategory =>{
              return(                       
                  <div key={subcategory.id}><div className="banner-text-header" style={{color: "black", fontSize: "45px", marginTop: "40px"}}>{subcategory.name}</div>
                      {
                          subcategory.products.filter(x => x.isDelete == false).map(product =>{
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
                                              <td><a className="add-to-bag-btn">Add To Order</a></td>
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
    return (
      <>
        {menu_content}  
      </>
    );
}

export default MenuPage;