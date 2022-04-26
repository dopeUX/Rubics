import React from "react";
import Seller from "../../components/Seller";
import connectMetamask from "../../functions/connectMetamask";
import { useRouter } from "next/router";

export default function ConnectSeller() {
  const router = useRouter();

  async function connect() {
    const res = await connectMetamask();
    console.log(res[0]);
    router.replace("/seller/createSeller");
  }
  return (
    <Seller>
      <div className="seller-connect-content">
        <img className="r-logo" src="/icons/r-logo.svg" alt="" />
        <h3>
          Connect to your metamask wallet to proceed with your seller account
        </h3>

        <button
          onClick={() => {
            connect();
          }}
        >
          connect to metamask
        </button>
      </div>
    </Seller>
  );
}
