import web3 from './web3';
import seller from './build/Seller.json';

export default function Seller(address){
    return new web3.eth.Contract(
        seller.abi,
        address
    );
}