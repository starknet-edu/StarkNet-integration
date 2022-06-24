import {
  Account,
  number,
  hash,
  KeyPair,
  ProviderInterface,
  SignerInterface,
  constants,
  transaction,
  Transaction,
} from 'starknet';

const { toHex, bigNumberishArrayToDecimalStringArray } = number;
const { StarknetChainId } = constants;
const { fromCallsToExecuteCalldataWithNonce } = transaction;

export class OfflineAccount extends Account {
  constructor(
    provider: ProviderInterface,
    address: string,
    keyPairOrSigner: KeyPair | SignerInterface
  ) {
    super(provider, address, keyPairOrSigner);
  }

  public async broadcastSignedTransaction(transaction: Transaction) {
    return await this.fetchEndpoint('add_transaction', undefined, transaction);
  }

  public async signTx(
    targetContract: string,
    entrypoint: string,
    txCalldata: number.BigNumberish[]
  ): Promise<Transaction> {
    const invocation = {
      contractAddress: targetContract,
      entrypoint: entrypoint,
      calldata: txCalldata,
    };
    const { suggestedMaxFee } = await this.estimateFee(invocation);

    const transactionDetail = {
      walletAddress: this.address,
      chainId: StarknetChainId.TESTNET,
      nonce: await this.getNonce(),
      version: 0,
      maxFee: suggestedMaxFee,
    };
    return {
      type: 'INVOKE_FUNCTION',
      entry_point_selector: '0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad',
      contract_address: this.address,
      calldata: fromCallsToExecuteCalldataWithNonce([invocation], transactionDetail.nonce),
      signature: bigNumberishArrayToDecimalStringArray(
        await this.signer.signTransaction([invocation], transactionDetail)
      ),
      max_fee: toHex(suggestedMaxFee),
    };
  }
}
