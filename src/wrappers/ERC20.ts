import { OfflineAccount } from './OfflineAccount';
import {
  uint256,
  number,
  KeyPair,
  ProviderInterface,
  SignerInterface,
  Transaction,
  AddTransactionResponse,
} from 'starknet';

const { toFelt } = number;

export class ERC20 extends OfflineAccount {
  public erc20Address: string;
  constructor(
    provider: ProviderInterface,
    address: string,
    keyPairOrSigner: KeyPair | SignerInterface,
    erc20Address: string
  ) {
    super(provider, address, keyPairOrSigner);
    this.erc20Address = erc20Address;
  }

  public compileUint256(value: uint256.Uint256): string[] {
    return [toFelt(value.low), toFelt(value.high)];
  }

  public async balanceOf(account: number.BigNumberish): Promise<string[]> {
    return (
      await this.callContract({
        contractAddress: this.erc20Address,
        entrypoint: 'balanceOf',
        calldata: [toFelt(account)],
      })
    ).result;
  }

  public async allowance(owner: string, spender: string): Promise<string[]> {
    return (
      await this.callContract({
        contractAddress: this.erc20Address,
        entrypoint: 'allowance',
        calldata: [owner, spender],
      })
    ).result;
  }

  public async name(): Promise<string[]> {
    return (
      await this.callContract({
        contractAddress: this.erc20Address,
        entrypoint: 'name',
      })
    ).result;
  }

  public async totalSupply(): Promise<string[]> {
    return (
      await this.callContract({
        contractAddress: this.erc20Address,
        entrypoint: 'totalSupply',
      })
    ).result;
  }

  public async decimals(): Promise<string[]> {
    return (
      await this.callContract({
        contractAddress: this.erc20Address,
        entrypoint: 'decimals',
      })
    ).result;
  }

  public async signTransfer(recipient: string, amount: uint256.Uint256): Promise<Transaction> {
    return await this.signTx(this.erc20Address, 'transfer', [
      recipient,
      toFelt(amount.low),
      toFelt(amount.high),
    ]);
  }

  public async transfer(
    recipient: string,
    amount: uint256.Uint256
  ): Promise<AddTransactionResponse> {
    return await this.broadcastSignedTransaction(await this.signTransfer(recipient, amount));
  }

  public async signApprove(spender: string, amount: uint256.Uint256): Promise<Transaction> {
    return await this.signTx(this.erc20Address, 'approve', [
      spender,
      ...this.compileUint256(amount),
    ]);
  }

  public async approve(spender: string, amount: uint256.Uint256): Promise<AddTransactionResponse> {
    return await this.broadcastSignedTransaction(await this.signApprove(spender, amount));
  }

  public async signTransferFrom(
    sender: string,
    recipient: string,
    amount: uint256.Uint256
  ): Promise<Transaction> {
    return await this.signTx(this.erc20Address, 'transferFrom', [
      sender,
      recipient,
      ...this.compileUint256(amount),
    ]);
  }

  public async transferFrom(
    sender: string,
    recipient: string,
    amount: uint256.Uint256
  ): Promise<AddTransactionResponse> {
    return await this.broadcastSignedTransaction(
      await this.signTransferFrom(sender, recipient, amount)
    );
  }

  public async signIncreaseAllowance(
    spender: string,
    added_value: uint256.Uint256
  ): Promise<Transaction> {
    return await this.signTx(this.erc20Address, 'increaseAllowance', [
      spender,
      ...this.compileUint256(added_value),
    ]);
  }

  public async increaseAllowance(
    spender: string,
    added_value: uint256.Uint256
  ): Promise<AddTransactionResponse> {
    return await this.broadcastSignedTransaction(
      await this.signIncreaseAllowance(spender, added_value)
    );
  }
  public async signDecreaseAllowance(
    spender: string,
    subtracted_value: uint256.Uint256
  ): Promise<Transaction> {
    return await this.signTx(this.erc20Address, 'decreaseAllowance', [
      spender,
      ...this.compileUint256(subtracted_value),
    ]);
  }

  public async decreaseAllowance(
    spender: string,
    subtracted_value: uint256.Uint256
  ): Promise<AddTransactionResponse> {
    return await this.broadcastSignedTransaction(
      await this.signDecreaseAllowance(spender, subtracted_value)
    );
  }
}
