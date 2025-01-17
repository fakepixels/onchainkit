import { baseSepolia } from 'viem/chains';
import { getOnchainKitConfig, setOnchainKitConfig } from './OnchainKitConfig';
import { getRPCUrl } from './getRPCUrl';

describe('OnchainKitConfig RPC URL', () => {
  it('should require an api key if rpc url is unset', () => {
    const chain = baseSepolia;
    setOnchainKitConfig({ chain });
    expect(() => getRPCUrl()).toThrow(
      'RPC URL Unset: You can use the Coinbase Developer Platform RPC by providing an API key in `setOnchainKitConfig`: https://portal.cdp.coinbase.com/products/templates',
    );
  });

  it('should return the correct config value', () => {
    const chain = baseSepolia;
    const apiKey = 'test-api-key';
    const rpcUrl = 'https://api.developer.coinbase.com/rpc/v1/base-sepolia/test-api-key';
    setOnchainKitConfig({ chain, apiKey });
    expect(getOnchainKitConfig('chain')).toEqual(chain);
    expect(getOnchainKitConfig('apiKey')).toEqual(apiKey);
    expect(getRPCUrl()).toEqual(rpcUrl);
  });

  it('should update the rpc url for a new api key', () => {
    const chain = baseSepolia;
    const apiKey = 'test-api-key';
    const newApiKey = 'updated-api-key';
    const expectedRpcUrl = 'https://api.developer.coinbase.com/rpc/v1/base-sepolia/updated-api-key';
    setOnchainKitConfig({ chain, apiKey });
    expect(getOnchainKitConfig('chain')).toEqual(chain);
    expect(getOnchainKitConfig('apiKey')).toEqual(apiKey);

    setOnchainKitConfig({ apiKey: newApiKey });
    expect(getRPCUrl()).toEqual(expectedRpcUrl);
  });

  it('should return the correct config value for a user-set rpc url', () => {
    const chain = baseSepolia;
    const apiKey = 'test-api-key';
    const userRpcUrl = 'https://api.example.com/rpc/v1/base-sepolia/test-api-key';
    setOnchainKitConfig({ chain, apiKey, rpcUrl: userRpcUrl });
    expect(getOnchainKitConfig('chain')).toEqual(chain);
    expect(getOnchainKitConfig('apiKey')).toEqual(apiKey);
    expect(getRPCUrl()).toEqual(userRpcUrl);
  });
});
