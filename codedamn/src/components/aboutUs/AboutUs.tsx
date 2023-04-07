import { wrap } from "module";

const AboutUsPage = () =>{
    return (
        <div style={{width: "100%"}}>
            <img style={{width: "80%", margin: "80px 10%"}} src="https://assets.bonappetit.com/photos/613a391e46535806a6463fd8/16:9/w_2000,h_1125,c_limit/Down%20North%20Pizza%20Lede%20Portrait.jpg"></img>
            <div style={{backgroundColor: "firebrick", display: "block", height: "3px", width: "82%", margin: "0 9%"}}></div>
            <div style={{overflow: "wrap", margin: "10px 10% 60px 10%", fontSize: "35px", fontFamily: "Gill Sans"}}>Welcome to PizzaHub, your go-to pizzeria in Brooklyn! Our restaurant is located in the heart of the city, and we've been serving our delicious pizzas to the community for over a decade.

                At PizzaHub, we're passionate about making great pizza. We use only the freshest ingredients and traditional techniques to create a wide range of mouth-watering pizzas that are sure to satisfy any pizza lover. Whether you prefer classic Margherita, meat-lover's, or vegetarian, we've got something for everyone.

                But we're not just about pizza. Our menu also features a variety of salads, sides, and desserts to round out your meal. And we offer gluten-free and vegan options too, so everyone can enjoy our delicious food.

                At PizzaHub, we're committed to providing a warm and welcoming atmosphere for all of our guests. Our friendly staff is always ready to help you with anything you need, whether it's making a recommendation, answering a question, or just chatting about the latest sports game.

                So come on in and enjoy the best pizza in Brooklyn! We're open seven days a week, and we offer dine-in, takeout, and delivery options for your convenience. We look forward to seeing you soon!</div>
            </div>
    )
}

export default AboutUsPage;