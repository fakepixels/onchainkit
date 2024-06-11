import { useCallback, useState } from 'react';
import { TokenSelectModalReact } from '../types';
import { createPortal } from 'react-dom';
import { TokenSelectButton } from './TokenSelectButton';
import { TokenSearch } from './TokenSearch';
import { TokenChip } from './TokenChip';
import { TokenRow } from './TokenRow';

export function TokenSelectModal({ options, setToken, token }: TokenSelectModalReact) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTokens, setFilteredTokens] = useState(options);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleChange = useCallback((text: string) => {
    setFilteredTokens(
      options.filter(({ address, name, symbol }) => {
        return (
          address.toLowerCase().startsWith(text) ||
          name.toLowerCase().includes(text) ||
          symbol.toLowerCase().includes(text)
        );
      }),
    );
  }, []);

  return (
    <>
      <TokenSelectButton onClick={handleToggle} isOpen={isOpen} token={token} />
      {isOpen &&
        createPortal(
          <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-400">
            <div className="flex h-[600px] w-[475px] flex-col gap-4 rounded-3xl bg-white p-4">
              <TokenSearch onChange={handleChange} delayMs={200} />
              {filteredTokens.length > 0 && (
                <div className="flex gap-2">
                  {filteredTokens.map((token) => (
                    <TokenChip key={token.name} token={token} onClick={setToken} />
                  ))}
                </div>
              )}
              {filteredTokens.length > 0 ? (
                <div>
                  <div className="text-body text-black">Tokens</div>
                  <div>
                    {filteredTokens.map((token) => (
                      <TokenRow key={token.name} token={token} onClick={setToken} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-body text-black">No tokens found</div>
              )}
            </div>
          </div>,
          document.body!,
        )}
    </>
  );
}
