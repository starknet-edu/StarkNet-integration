/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type {
  Contract,
  Overrides,
  AddTransactionResponse,
  Invocation,
  EstimateFeeResponse,
} from "starknet";
import type { BigNumberish } from "starknet/utils/number";
import type { BlockIdentifier } from "starknet/provider/utils";

export type Uint256 = {
  low: BigNumberish;
  high: BigNumberish;
};
export interface ERC20 extends Contract {
  name(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BigNumberish] & { name: BigNumberish }>;
  symbol(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BigNumberish] & { symbol: BigNumberish }>;
  totalSupply(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[Uint256] & { totalSupply: Uint256 }>;
  decimals(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BigNumberish] & { decimals: BigNumberish }>;
  balanceOf(
    account: BigNumberish,
    options?: { blockIdentifier?: BlockIdentifier }
  ): Promise<[Uint256] & { balance: Uint256 }>;
  allowance(
    owner: BigNumberish,
    spender: BigNumberish,
    options?: { blockIdentifier?: BlockIdentifier }
  ): Promise<[Uint256] & { remaining: Uint256 }>;
  transfer(
    recipient: BigNumberish,
    amount: Uint256,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  transferFrom(
    sender: BigNumberish,
    recipient: BigNumberish,
    amount: Uint256,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  approve(
    spender: BigNumberish,
    amount: Uint256,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  increaseAllowance(
    spender: BigNumberish,
    added_value: Uint256,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  decreaseAllowance(
    spender: BigNumberish,
    subtracted_value: Uint256,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  mint(
    to: BigNumberish,
    amount: Uint256,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  functions: {
    name(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { name: BigNumberish }>;
    symbol(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { symbol: BigNumberish }>;
    totalSupply(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[Uint256] & { totalSupply: Uint256 }>;
    decimals(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { decimals: BigNumberish }>;
    balanceOf(
      account: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[Uint256] & { balance: Uint256 }>;
    allowance(
      owner: BigNumberish,
      spender: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[Uint256] & { remaining: Uint256 }>;
    transfer(
      recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    transferFrom(
      sender: BigNumberish,
      recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    approve(
      spender: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    increaseAllowance(
      spender: BigNumberish,
      added_value: Uint256,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    decreaseAllowance(
      spender: BigNumberish,
      subtracted_value: Uint256,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    mint(
      to: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
  };
  callStatic: {
    name(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { name: BigNumberish }>;
    symbol(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { symbol: BigNumberish }>;
    totalSupply(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[Uint256] & { totalSupply: Uint256 }>;
    decimals(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { decimals: BigNumberish }>;
    balanceOf(
      account: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[Uint256] & { balance: Uint256 }>;
    allowance(
      owner: BigNumberish,
      spender: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[Uint256] & { remaining: Uint256 }>;
    transfer(
      recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BigNumberish] & { success: BigNumberish }>;
    transferFrom(
      sender: BigNumberish,
      recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BigNumberish] & { success: BigNumberish }>;
    approve(
      spender: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BigNumberish] & { success: BigNumberish }>;
    increaseAllowance(
      spender: BigNumberish,
      added_value: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BigNumberish] & { success: BigNumberish }>;
    decreaseAllowance(
      spender: BigNumberish,
      subtracted_value: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BigNumberish] & { success: BigNumberish }>;
    mint(
      to: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
  };
  populateTransaction: {
    name(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    symbol(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    totalSupply(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    decimals(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    balanceOf(
      account: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Invocation;
    allowance(
      owner: BigNumberish,
      spender: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Invocation;
    transfer(
      recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Invocation;
    transferFrom(
      sender: BigNumberish,
      recipient: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Invocation;
    approve(
      spender: BigNumberish,
      amount: Uint256,
      options?: Overrides
    ): Invocation;
    increaseAllowance(
      spender: BigNumberish,
      added_value: Uint256,
      options?: Overrides
    ): Invocation;
    decreaseAllowance(
      spender: BigNumberish,
      subtracted_value: Uint256,
      options?: Overrides
    ): Invocation;
    mint(to: BigNumberish, amount: Uint256, options?: Overrides): Invocation;
  };
  estimateFee: {
    name(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    symbol(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    totalSupply(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    decimals(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    balanceOf(
      account: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    allowance(
      owner: BigNumberish,
      spender: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    transfer(
      recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    transferFrom(
      sender: BigNumberish,
      recipient: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    approve(
      spender: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    increaseAllowance(
      spender: BigNumberish,
      added_value: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    decreaseAllowance(
      spender: BigNumberish,
      subtracted_value: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    mint(
      to: BigNumberish,
      amount: Uint256,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
  };
}