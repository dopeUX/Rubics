require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/Factory.json');
const compiledShopProducts = require('./build/ShopProducts.json')
const Matic = require('@maticnetwork/maticjs');

const provider = new HDWalletProvider(
  process.env.PRIVATE_KEY,
  process.env.API
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from', accounts[0]);

  const result = await new web3.eth.Contract(compiledShopProducts.abi)
    .deploy({ data: '0x' + compiledShopProducts.evm.bytecode.object })
    .send({ gas: '3000000', from: accounts[0] });
  // console.log(interface) 
  console.log('contract deployed to', result.options.address);


}
deploy();
