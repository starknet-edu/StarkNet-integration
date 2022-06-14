import { readFileSync } from 'fs';
import { defaultProvider, Contract, json, uint256 } from 'starknet';

async function main(user: string, contractAddress: string) {
  const abi = json.parse(readFileSync('./compiled_contracts/ERC20_abi.json', 'utf-8'));
  const contract = new Contract(abi, contractAddress, defaultProvider);
  const balance = await contract.balanceOf(user);
  return uint256.uint256ToBN(balance.balance);
}

const user = '';
const contractAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'; // "Official" StarkNet Eth address

const userBalance = main(user, contractAddress);
