import { CDP_GET_SWAP_TRADE } from '../../definitions/swap';
import { sendRequest } from '../../queries/request';
import { getAPIParamsForToken } from './getAPIParamsForToken';
import { getSwapTransaction } from './getSwapTransaction';
import type {
  BuildSwapTransactionParams,
  BuildSwapTransactionResponse,
  SwapAPIResponse,
  SwapError,
  SwapAPIParams,
} from '../types';

/**
 * Retrieves an unsigned transaction for a swap from Token A to Token B.
 */
export async function buildSwapTransaction(
  params: BuildSwapTransactionParams,
): Promise<BuildSwapTransactionResponse> {
  // Default parameters
  const defaultParams = {
    amountReference: 'from',
    isAmountInDecimals: false,
  };

  const apiParams = getAPIParamsForToken({ ...defaultParams, ...params });

  try {
    const res = await sendRequest<SwapAPIParams, SwapAPIResponse>(CDP_GET_SWAP_TRADE, [apiParams]);
    if (res.error) {
      return {
        code: res.error.code,
        error: res.error.message,
      } as SwapError;
    }

    const trade = res.result;
    return {
      approveTransaction: trade.approveTx
        ? getSwapTransaction(trade.approveTx, trade.chainId)
        : undefined,
      fee: trade.fee,
      quote: trade.quote,
      transaction: getSwapTransaction(trade.tx, trade.chainId),
      warning: trade.quote.warning,
    };
  } catch (error) {
    throw new Error(`getSwap: ${error}`);
  }
}
