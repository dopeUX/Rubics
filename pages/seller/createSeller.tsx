import React, { useEffect, useState } from "react";
import Seller from "../../components/Seller";
import web3 from "../../Ethereum/web3";
import createSeller from "../../functions/createSeller";
import seller from "../../Ethereum/seller";

export default function CreateSeller(props: any) {
  const [account, setAccount] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [buisness, setBuisness] = useState("");

  useEffect(() => {
    const fetchAcc = async () => {
      const res = await web3.eth.getAccounts();
      setAccount(res[0]);
    };

    fetchAcc();
  });

  return (
    <Seller>
      {console.log(props.s)}
      <div className="create-seller">
        <img className="r-logo" src="/icons/r-logo.svg" alt="" />
        <h2>{account}</h2>
        <SellerInputBox
          label="Name"
          icon="/icons/name-icon.svg"
          onChange={setName}
        />
        <SellerInputBox
          label="Phone"
          icon="/icons/call-icon.svg"
          onChange={setPhone}
        />
        <SellerInputBox
          label="Buisness name"
          icon="/icons/buisness-icon.svg"
          onChange={setBuisness}
        />
        <button
          onClick={() => {
            console.log("creating seller");
            createSeller(name, phone, buisness).then((res) => {
              console.log(res);
            });
          }}
        >
          Create account
        </button>
      </div>
    </Seller>
  );
}

const SellerInputBox = (props: any) => {
  return (
    <div className="create-seller-input-box">
      <h3>{props.label}</h3>

      <input
        type="text"
        onChange={(e) => {
          props.onChange(e.currentTarget.value);
        }}
      />
      <img src={props.icon} alt="" />
    </div>
  );
};

CreateSeller.getInitialProps = async (props) => {
  const s = seller("0x16CB6B87746DF714A853d62a25Eb0C3C99380506");
  const name = await s.methods.seller_phone().call();
  return { s: name };
};
