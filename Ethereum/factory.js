import web3 from "./web3";
import factory from './build/Factory.json';
const address =  process.env.FACTORY_CONTRACT;

const instance = new web3.eth.Contract(
     factory.abi,
     '0x2A61bfA111Afcc0C6DdD0E8Fa5F09C6b2302E34e'
); 
// console.log(instance.methods.getDeployedCampaigns())

export default instance;