import { readFileSync } from 'fs';
import { Abi, Contract, json, Provider, Account, defaultProvider, ec } from 'starknet';
import { ERC20 } from '../types/starknet-contracts/index';

const { getKeyPair } = ec;

function loadContract<C extends Contract>(abi: Abi, address: string, provider: Provider): C {
  return new Contract(abi, address, provider) as C;
}

async function main() {
  const privateKey = '0x1234';
  const starkPair = getKeyPair(privateKey);
  const walletAddress = '0x1234';
  const abi: Abi = json.parse(readFileSync('./compiled_contracts/ERC20.json', 'utf-8')).abi;
  const acc: Account = new Account(defaultProvider, walletAddress, starkPair);
  const erc20address = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'; // Eth address
  const erc20: ERC20 = loadContract(abi, erc20address, defaultProvider);
  erc20.connect(acc);
  console.log(await erc20.transfer(walletAddress, { low: 100, high: 0 }));
}
main();
