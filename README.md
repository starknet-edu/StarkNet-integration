# Exchanges

## Account Example

This file generates a private/public key pair, precomputes the Account contract address and deploys an Argent X account contract. If you want to precompute the address of another contract you can use [this script](src/contract_hash.py) to compute the class hash of the contract.

## Offline Account

This class extends the Account class and enables to sign a transaction and later broadcast this signed transaction.

Here is an example on how to create an `OfflineAccount` instance, sign a transaction and then broadcast it.

```ts
const privateKey = '0x1234';
const starkPair = ec.getKeyPair(privateKey);
const signer = new Signer(starkPair);
const provider = new Provider({network: 'mainnet-alpha'}); // for testnet you can use defaultProvider
const acc: OfflineAccount = new OfflineAccount(provider, walletAddress, signer);
const targetContract = '0x123456';
const entrypoint = 'dummy_entrypoint';
const calldata = compileCalldata({arg1: 1, arg2: 2});
const signedTx = await acc.signTx(targetContract, entrypoint, calldata);
const sentTx = await acc.broadcastSignedTransaction(signedTx);
```

## ERC20

This class extends `OfflineAccount` and wraps all the main functions of an `ERC20` smart-contract. It allows to easily sign/broadcast ERC20 transactions. It's quite similar to typechain.

Here is an example on how to execute a simple ERC20 transfer through the `ERC20` class.

```ts
const privateKey = '0x1234';
const starkPair = ec.getKeyPair(privateKey);
const signer = new Signer(starkPair);
const provider = new Provider({network: 'mainnet-alpha'}); // for testnet you can use defaultProvider
const erc20address = '0x12345678';
const eth : ERC20 = new ERC20(provider, walletAddress, signer, erc20address);
const recipient = '0x123';
const amount = { low: 100, high: 0 };
const sentTx = await eth.transfer(recipient, amount);
```
