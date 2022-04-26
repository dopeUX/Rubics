import web3 from "../Ethereum/web3";
import factory from "../Ethereum/factory";

export default async function createSeller(
  name: string,
  phone: string,
  buisness: string,
) {
  try {
    const accounts: string[] = await web3.eth.getAccounts();
    await factory.methods.createSeller(name, phone, buisness).send({
      from: accounts[0],
      value: 300000000000000000,
    });
    return true;
  } catch (err) {
    return err;
  }
}
