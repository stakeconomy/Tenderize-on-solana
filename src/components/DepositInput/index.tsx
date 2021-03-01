import React, { useCallback, useState } from 'react';
import {
  InputType,
  useSliderInput,
  useTokenName,
  useUserBalance,
} from '../../hooks';
// import { LendingReserve } from '../../models/lending';
import { TokenIcon } from '../TokenIcon';
import { Button, Card, Slider } from 'antd';
import { NumericInput } from '../Input/numeric';
import { useConnection } from '../../contexts/connection';
import { useWallet } from '../../contexts/wallet';
import { deposit } from '../../actions/deposit';
// import { PublicKey } from '@solana/web3.js';
import { ActionConfirmation } from './../ActionConfirmation';
import { LABELS, marks } from '../../constants';
import { WRAPPED_SOL_MINT } from '../../utils/ids';
import { ConnectButton } from '../ConnectButton';

export const DepositInput = (props: { className?: string }) => {
  const connection = useConnection();
  const { wallet } = useWallet();
  const [pendingTx, setPendingTx] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  /*
  const reserve = props.reserve;
  const address = props.address;
  */

  const name = useTokenName(WRAPPED_SOL_MINT);
  const { accounts: fromAccounts, balance, balanceLamports } = useUserBalance(
    WRAPPED_SOL_MINT
  );

  const convert = useCallback(
    (val: string | number) => {
      if (typeof val === 'string') {
        return (parseFloat(val) / balance) * 100;
      } else {
        return ((val * balance) / 100).toFixed(2);
      }
    },
    [balance]
  );

  const { value, setValue, pct, setPct, type } = useSliderInput(convert);

  const onDeposit = useCallback(() => {
    setPendingTx(true);

    (async () => {
      try {
        await deposit(
          fromAccounts[0],
          type === InputType.Percent
            ? (pct * balanceLamports) / 100
            : Math.ceil(balanceLamports * (parseFloat(value) / balance)),
          connection,
          wallet!
        );

        setValue('');
        setShowConfirmation(true);
      } catch (e) {
        console.log(`error: ${e}`);
      } finally {
        setPendingTx(false);
      }
    })();
  }, [
    connection,
    setValue,
    balanceLamports,
    balance,
    wallet,
    value,
    pct,
    type,
    fromAccounts,
  ]);

  const bodyStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };

  return (
    <Card className={props.className} bodyStyle={bodyStyle}>
      {showConfirmation ? (
        <ActionConfirmation onClose={() => setShowConfirmation(false)} />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <div className='deposit-input-title'>{LABELS.DEPOSIT_QUESTION}</div>
          <div className='token-input'>
            <TokenIcon mintAddress={WRAPPED_SOL_MINT} />
            <NumericInput
              value={value}
              onChange={setValue}
              autoFocus={true}
              style={{
                fontSize: 20,
                boxShadow: 'none',
                borderColor: 'transparent',
                outline: 'transparent',
              }}
              placeholder='0.00'
            />
            <div>{name}</div>
          </div>

          <Slider marks={marks} value={pct} onChange={setPct} />
          <ConnectButton
            className='tenderButton tenderButtonShade'
            type='primary'
            onClick={onDeposit}
            loading={pendingTx}
            disabled={fromAccounts.length === 0}
          >
            {LABELS.DEPOSIT_ACTION}
          </ConnectButton>
          {/* <Button
            type='primary'
            onClick={onDeposit}
            loading={pendingTx}
            disabled={fromAccounts.length === 0}
          >
            {LABELS.DEPOSIT_ACTION}
          </Button> */}
        </div>
      )}
    </Card>
  );
};
