# StarkNet exchanges integration

Everything is done using starknet.js

## Key pair generation and account contract address pre computation

```ts
import { ec, stark, hash } from "starknet";

const { getSelectorFromName, computeHashOnElements } = hash;
const { genKeyPair, getStarkKey } = ec;
const { compileCalldata } = stark;

// These 2 class hashes (Argent X Account contract and proxy) are needed to compute the contract address
const PROXY_CLASS_HASH =
  "1072035497076846607322037267784110659410341675694031857644447227002241788184";
const ACCOUNT_CLASS_HASH =
  "0x3e327de1c40540b98d05cbcb13552008e36f0ec8d61d46956d2f9752c294328";

const starkPair = genKeyPair();
const starkPub = getStarkKey(starkPair);

const salt = "0xdead";

const accountInitCalldata = compileCalldata({
  signer: starkPub,
  guardian: "0xbeef",
});
const accConstructorCalldata = compileCalldata({
  implementation: ACCOUNT_CLASS_HASH,
  selector: getSelectorFromName("initialize"),
  calldata: accountInitCalldata,
});

// the ASCII encoding of the constant string “STARKNET_CONTRACT_ADDRESS”
const PREFIX = "523065374597054866729014270389667305596563390979550329787219";

const CALLER_ADDRESS = 0; //  currently always zero

const address = computeHashOnElements([
  PREFIX,
  CALLER_ADDRESS,
  salt,
  PROXY_CLASS_HASH,
  computeHashOnElements(accConstructorCalldata),
]);
```

## Account contract deployment

```ts
import { readFileSync } from "fs";
import { ec, stark, hash, Provider } from "starknet";

const { getSelectorFromName, computeHashOnElements } = hash;
const { getKeyPair, getStarkKey } = ec;
const { compileCalldata } = stark;

const ACCOUNT_CLASS_HASH =
  "0x3e327de1c40540b98d05cbcb13552008e36f0ec8d61d46956d2f9752c294328";

const pk = "0xdead";
const starkPair = getKeyPair(pk);
const starkPub = getStarkKey(starkPair);

const salt = "0xdead";

const accountInitCalldata = compileCalldata({
  signer: starkPub,
  guardian: "0xbeef",
});

const accConstructorCalldata = compileCalldata({
  implementation: ACCOUNT_CLASS_HASH,
  selector: getSelectorFromName("initialize"),
  calldata: accountInitCalldata,
});

const provider = new Provider({ network: "mainnet-alpha" });

const deploymentTx = await provider.deployContract({
  contract: readFileSync("PATH_TO_COMPILED_CONTRACT", "utf-8"),
  constructorCalldata: accConstructorCalldata,
  addressSalt: salt,
});

await provider.waitForTransaction(deploymentTx.transaction_hash);
```

## Calculate transaction fee

```ts
import { Provider, ec, stark } from "starknet";
import { OfflineAccount } from "./OfflineAccount";
const { getKeyPair } = ec;
const { compileCalldata } = stark;

const pk = "0xdead";
const starkPair = getKeyPair(pk);
const accountAddress = "0xbeef";

const provider = new Provider({ network: "mainnet-alpha" });
const targetContract = "0x1234";
const entrypoint = "target_entrypoint";

const acc = new OfflineAccount(provider, accountAddress, starkPair);

const currentNonce = await acc.getNonce();

const calldata = compileCalldata({ arg1: "whatever", arg2: "anything" });

const rawTx = {
  contractAddress: targetContract,
  entrypoint: entrypoint,
  calldata: calldata,
};

const { suggestedMaxFee } = await acc.estimateFee(rawTx, {
  nonce: currentNonce, // current account contract nonce (can be omitted so it'll be fetched automatically)
  blockIdentifier: "pending", // if the fees should be estimated at the pending block or the last mined block
});
```

## Sign tx offline and broadcast it

```ts
import { Provider, ec, stark } from "starknet";
import { OfflineAccount } from "./OfflineAccount";
const { getKeyPair } = ec;
const { compileCalldata } = stark;

const pk = "0xdead";
const starkPair = getKeyPair(pk);
const accountAddress = "0xbeef";

const provider = new Provider({ network: "mainnet-alpha" });
const targetContract = "0x1234";
const entrypoint = "target_entrypoint";

const acc = new OfflineAccount(provider, accountAddress, starkPair);

const currentNonce = await acc.getNonce();

const calldata = compileCalldata({ arg1: "whatever", arg2: "anything" });

const rawTx = {
  contractAddress: targetContract,
  entrypoint: entrypoint,
  calldata: calldata,
};

const signedTx = await acc.signTx(rawTx, currentNonce);
const sentTx = await acc.broadcastSignedTransaction(signedTx);
```

## Get tx status

```js
var axios = require('axios');
var txHash = '0x3a9c45c513d63ccdb761e5d25303d21cce8cb990a5b201a4f62046dbc0d5453'
var data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "starknet_getTransactionByHash",
  "params": [
    txHash
  ],
  "id": 1
});
var baseUrl = 'http://localhost:9545?='
var config = {
  method: 'post',
  url: baseUrl,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
