import React, { useEffect } from "react";
import web3 from "../Ethereum/web3";
import connectMetamask from "../functions/connectMetamask";

export default function Seller(props) {
  return (
    <div className="seller-connect-page">
      <img className="cover" src="/images/image1.jpg" alt="" />

      <div className="seller-connect-layer">
        <div className="seller-connect-gradient"></div>
        <div className="seller-connect-back"></div>
      </div>
      {props.children}
      <a href="">Photo by Roman/pexels.com</a>
    </div>
  );
}
