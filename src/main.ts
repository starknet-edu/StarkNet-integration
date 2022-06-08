import { readFileSync } from 'fs';
import { AddTransactionResponse, defaultProvider, ec, stark } from 'starknet';
import { getSelectorFromName, computeHashOnElements } from 'starknet/dist/utils/hash';

// Argent X account contract class hash (needed for proxy deployment)
const ACCOUNT_CLASS_HASH = '0x3e327de1c40540b98d05cbcb13552008e36f0ec8d61d46956d2f9752c294328';

// Argent X proxy contract class hash (needed for address computation)
const PROXY_CLASS_HASH =
  '1072035497076846607322037267784110659410341675694031857644447227002241788184';

const COMPILED_PROXY = readFileSync('./compiled_contracts/Proxy.json', 'utf-8');

/**
 * @param  {string} compiledContract - Compiled contract file content
 * @param  {string[]} calldata - constructor arguments
 * @param  {string} salt - salt used for the deployment
 * @returns Promise - { code: string, transaction_hash: string, address: string }
 */
async function deployAcc(
  compiledContract: string,
  calldata: string[],
  salt: string
): Promise<AddTransactionResponse> {
  const deployTransaction = await defaultProvider.deployContract({
    contract: compiledContract,
    constructorCalldata: calldata,
    addressSalt: salt,
  });
  return deployTransaction;
}

/**
 * @param  {string} contractClassHash - class hash of the contract
 * @param  {string} salt - salt used for the deployment
 * @param  {string[]} constructorCalldata - constructor arguments
 * @returns Promise - contract address as hex string
 */
async function computeAddress(
  contractClassHash: string,
  salt: string,
  constructorCalldata: string[]
): Promise<string> {
  const PREFIX = '523065374597054866729014270389667305596563390979550329787219';
  // the ASCII encoding of the constant string “STARKNET_CONTRACT_ADDRESS”
  const CALLER_ADDRESS = 0; //  currently always zero

  const address = computeHashOnElements([
    PREFIX,
    CALLER_ADDRESS,
    salt,
    contractClassHash,
    computeHashOnElements(constructorCalldata),
  ]);
  return address;
}

async function main() {
  // Generating a random key pair
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

  // Precomputing the proxy contract address
  const expectedAddress = await computeAddress(PROXY_CLASS_HASH, salt, constructorCalldata);

  // Checking that the expected address is indeed the actual address
  if (expectedAddress !== (await deployAcc(COMPILED_PROXY, constructorCalldata, salt)).address) {
    throw new Error("Computed address doesn't match actual address");
  }
}
main();
