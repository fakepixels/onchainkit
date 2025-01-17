import { type ForwardedRef, forwardRef } from 'react';
import type { TokenSelectButtonReact } from '../types';
import { TokenImage } from './TokenImage';

function CaretUp() {
  return (
    <svg
      data-testid="ockTokenSelectButton_CaretUp"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.05329 10.9866L7.99996 6.03997L12.9466 10.9866L14.1266 9.80663L7.99996 3.67997L1.87329 9.80663L3.05329 10.9866Z"
        fill="#0A0B0D"
      />
    </svg>
  );
}

function CaretDown() {
  return (
    <svg
      data-testid="ockTokenSelectButton_CaretDown"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.95 4.85999L8.00001 9.80999L3.05001 4.85999L1.64001 6.27999L8.00001 12.64L14.36 6.27999L12.95 4.85999Z"
        fill="#0A0B0D"
      />
    </svg>
  );
}

export const TokenSelectButton = forwardRef(function TokenSelectButton(
  { onClick, token, isOpen }: TokenSelectButtonReact,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      data-testid="ockTokenSelectButton_Button"
      className="flex w-fit items-center gap-2 rounded-2xl bg-[#eef0f3] px-3 py-1 outline-none hover:bg-[#cacbce] active:bg-[#bfc1c3]"
      onClick={onClick}
      ref={ref}
    >
      {token ? (
        <>
          <TokenImage token={token} size={16} />
          <span
            data-testid="ockTokenSelectButton_Symbol"
            className="text-base font-medium leading-normal text-[#0a0b0d]"
          >
            {token.symbol}
          </span>
        </>
      ) : (
        <span className="text-base font-medium leading-normal text-[#0a0b0d]">Select</span>
      )}
      {isOpen ? <CaretUp /> : <CaretDown />}
    </button>
  );
});
