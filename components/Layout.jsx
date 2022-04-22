import Link from "next/link";
import Image from "next/image";
import React from "react";
import Header from './Header';

export default function Layout(props){
   return (
       <div className="layout">

         <section className="left-nav">
           <img className="logo" src='/icons/r-logo.svg' alt=''/>  
           <nav>
              <ul>
                <li>
                  <Link href='/'>
                      <a>Home</a>
                     </Link>  
                </li>
                <li>
                  <Link href='/shop'>
                      <a>Shop</a>
                    </Link>  
                </li>
                <li>
                  <Link href='/about-us'>
                      <a>About us</a>
                    </Link>  
                </li>
                <li>
                  <Link href='/contact'>
                      <a>Contact</a>
                  </Link>  
                </li>
              </ul>
           </nav>
         </section>

       <Header/>
       </div>
   )
}