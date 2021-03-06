export enum LendingInstruction {
  InitLendingMarket = 0,
  InitReserve = 1,
  InitObligation = 2,
  DepositReserveLiquidity = 6,
  WithdrawReserveLiquidity = 7,
  BorrowLiquidity = 5,
  RepayObligationLiquidity = 6,
  LiquidateObligation = 7,
  AccrueReserveInterest = 8,
}

export const TransactionListLookup: { [key: number]: string } = {
  3: "Deposit",
  4: "Withdraw",
  5: "Borrow",
  6: "Repay",
  7: "Liquidate",
};
