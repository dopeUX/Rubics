import React from "react";

export default function Header(props){

    return(
        <div className="header">
           <h1>Shop</h1>

           <section className="right-sec">
               <input type='text' placeholder='search'/>
               <img src="/icons/cart.svg" alt="" />               
               <img src="/icons/profile.svg" alt="" />               
           </section>
        </div>
    )
}