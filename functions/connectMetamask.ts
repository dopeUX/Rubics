import web3 from "../Ethereum/web3";

export default async function connectMetamask():Promise<any>{
      
      if(window.ethereum){
       return await window.ethereum.request({method:'eth_requestAccounts'})
        .then(res=>{
          return res;
        })
      }else{
        return alert("install metamask extension!!")
      }
}