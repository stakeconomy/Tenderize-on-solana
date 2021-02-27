import React from 'react';
// import { useLendingReserve } from '../../hooks';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// import { DepositInput } from '../../components/DepositInput';
import { Button, Card, Tabs, InputNumber } from 'antd';
import { Line } from 'react-chartjs-2';
import { sendTransaction, useConnection } from '../../contexts/connection';
import { useNativeAccount } from '../../contexts/accounts';
// import { STAKE_POOL_ID } from '../../utils/ids';
import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';
import { depositInstruction, DepositParams } from '../../models/lending';
import { notify } from '../../utils/notifications';
import {
  useWallet,
  WalletAdapter,
  WalletProvider,
} from '../../contexts/wallet';
// import { LendingReserve } from '../../models/lending';

const solanaLogo = require('../../img/solanaLogo.svg');
const { TabPane } = Tabs;

export const DiscoverView = () => {
  const connection = useConnection();

  const { wallet } = useWallet();

  const state = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Price',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        data: [12.8, 12.5, 13.4, 14, 13.8],
        fill: false,
      },
    ],
  };

  // const { id } = useParams<{ id: string }>();
  // const lendingReserve = useLendingReserve('SOL');
  // console.log('Reserve:', lendingReserve);
  // const reserve = lendingReserve?.info;

  // if (!reserve || !lendingReserve) {
  //   return null;
  // }

  // Test get LendingReserve
  // connection
  //   .getAccountInfo(
  //     new PublicKey('DKZKU3K8MiBbBfurpaG2ijf6nAGoXvomNysCJZ5jbgiy'),
  //     'single'
  //   )
  //   .then((res) => console.log(res));

  const deposit = async (params: DepositParams) => {
    console.log(`Deposit ${params.amount}`);
    const transaction = new Transaction();
    transaction.add(await depositInstruction(params));

    let tx = await sendTransaction(
      connection,
      wallet,
      [depositInstruction(params)],
      [...signers]
    );

    notify({
      message: 'Obligation accounts created',
      description: `Transaction ${tx}`,
      type: 'success',
    });

    // await sendAndConfirmTransaction(
    //   connection,
    //   transaction,
    //   [account],
    //   {
    //     commitment: 'singleGossip',
    //     preflightCommitment: 'singleGossip',
    //   }
    // );
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '200%',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '60%',
          marginRight: '30px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <h1>tSOL Share Price</h1>
          <Card className='card'>
            <Line
              data={state}
              options={{
                legend: {
                  display: false,
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value: any) {
                          return '$' + value;
                        },
                      },
                    },
                  ],
                },
              }}
            />
          </Card>
        </div>
        <div style={{ marginTop: '30px' }}>
          <h1>tSOL Vault Rewards</h1>
          <Card className='card'>
            <Line
              data={state}
              options={{
                legend: {
                  display: false,
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value: any) {
                          return '$' + value;
                        },
                      },
                    },
                  ],
                },
              }}
            />
          </Card>
        </div>
        <div style={{ marginTop: '30px' }}>
          <h1>About SOL</h1>
          <p className='subtext'>
            Solana is a fast, secure, and censorship resistant blockchain
            providing the open infrastructure required for global adoption.
          </p>
        </div>
      </div>

      <div
        className='card'
        style={{ height: '450px', width: '30%', position: 'sticky', top: 0 }}
      >
        <Card className='card' style={{ width: '100%', height: '100%' }}>
          <Tabs defaultActiveKey='1' centered={true}>
            <TabPane tab='Stake' key='1'>
              <div>
                <img
                  src={solanaLogo}
                  alt='solana logo'
                  style={{ maxWidth: '30%' }}
                />
                <h2 className='subtext' style={{ marginTop: '5px' }}>
                  SOLANA
                </h2>
              </div>
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <h2 className='title' style={{ marginBottom: 0 }}>
                  15.5%
                </h2>
                <h3 style={{ marginBottom: 0 }}>Vault Rewards</h3>
                <h5>(projected APY)</h5>
              </div>
              {/* <DepositInput
                className='card-fill'
                reserve={reserve}
                address={lendingReserve.pubkey}
              /> */}
              <InputNumber style={{ marginTop: '10px' }}></InputNumber>{' '}
              <span> SOL</span>
              <br />
              <Button
                className='tenderButton tenderButtonShade'
                style={{ marginTop: '10px' }}
                onClick={() =>
                  deposit({
                    userSource: account,
                    amount: 100000000000,
                    userToken: '',
                  })
                }
              >
                Stake
              </Button>
            </TabPane>
            <TabPane tab='Unstake' key='2'>
              <div>
                <img
                  src={solanaLogo}
                  alt='solana logo'
                  style={{ maxWidth: '30%' }}
                />
                <h2 className='subtext' style={{ marginTop: '5px' }}>
                  SOLANA
                </h2>
              </div>
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <h2 className='title' style={{ marginBottom: 0 }}>
                  15.5%
                </h2>
                <h3 style={{ marginBottom: 0 }}>Vault Rewards</h3>
                <h5>(projected APY)</h5>
              </div>
              <InputNumber style={{ marginTop: '10px' }}></InputNumber>{' '}
              <span> SOL</span>
              <br />
              <Button
                className='tenderButton tenderButtonShade'
                style={{ marginTop: '10px' }}
              >
                Unstake
              </Button>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
