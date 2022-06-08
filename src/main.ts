import { readFileSync } from 'fs';
import { defaultProvider, ec, stark } from 'starknet';
import { getSelectorFromName } from 'starknet/dist/utils/hash';

async function deployAcc(compiledContract: string, calldata: string[], salt: string) {
  const deployTransaction = await defaultProvider.deployContract({
    contract: compiledContract,
    constructorCalldata: calldata,
    addressSalt: salt,
  });
  return deployTransaction;
}

// Argent X account contract class hash (needed for proxy deployment)
const ACCOUNT_CLASS_HASH = '0x3e327de1c40540b98d05cbcb13552008e36f0ec8d61d46956d2f9752c294328';

// Argent X proxy contract class hash (needed for address computation)
const PROXY_CLASS_HASH =
  '692771186250089447853187296611718889956438341042390535747407094000177116738';

const COMPILED_PROXY = readFileSync('./Proxy.json', 'utf-8');

async function main() {
  // Generate a random key pair
  const starkPair = ec.genKeyPair();
  const starkPub = ec.getStarkKey(starkPair);

  // Salt used to deploy the proxy contract
  const salt = '0x10';

  // Calladata needed to initialize the proxy account
  const contractInitializationCalldata = stark.compileCalldata({
    signer: starkPub,
    guardian: '0x0',
  });

  // Calldata sent to the proxy constructor
  const constructorCalldata = stark.compileCalldata({
    implementation: ACCOUNT_CLASS_HASH,
    selector: getSelectorFromName('initialize'),
    calldata: contractInitializationCalldata,
  });

  console.log(await deployAcc(COMPILED_PROXY, constructorCalldata, salt));
}
main();
