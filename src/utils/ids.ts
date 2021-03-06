import { PublicKey } from '@solana/web3.js';

export const TENDERIZE_PROGRAM_ID = new PublicKey(
  'YiLSwwu3yBwaSHoaAooERKNeQ64BSbRuv7wXTZ5Uprf'
);

export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

export const TENDERIZED_SOL_MINT_ID = new PublicKey( // TODO: read from account
  'Do41x7Uza6cQeJ2VhVyJU6QhuRMLxTrLJhpL8MSNFpZm'
);

export let STAKE_POOL_ID = new PublicKey(
  'DKZKU3K8MiBbBfurpaG2ijf6nAGoXvomNysCJZ5jbgiy'
);

export let VALIDATORS_LIST_ID = new PublicKey( // TODO: read from account
  '7qaWgz27453E5CLPvcvGiLR2GobLPbKWsPmGDNQYRm6U'
);

export const WRAPPED_SOL_MINT = new PublicKey(
  'So11111111111111111111111111111111111111112'
);

export const OWNER_FEE_ACCOUNT = new PublicKey( // TODO: read from account
  'GAw1CLxsG1YoHG6CG4iiVF6TXB9xLKawkTz1M3xEzxUs'
);

export const RESERVE_ADDRESS_PDA = new PublicKey( // TODO: read from account
  'J5zPZnPwxxyV2vMSneQy4kasgteR1rHYEokfaa2G9DdQ'
);

export const WITHDRAW_AUTHORITY_PDA = new PublicKey( // TODO: read from account
  '5es37KhF5VKHtSPXNDzwPNMSndizyNFvHzeFwzEKW3vg'
);

export const TEMP_ACCOUNT_PDA = new PublicKey( // TODO: read from account
  'GvHtq21JoJr243heSNXh29kWz6unGtCG6stbyKcYM3m1'
);

// export let WITHDRAW_AUTHORITY_PDA: PublicKey;
// export let DEPOSIT_AUTHORITY_PDA: PublicKey;
// export let RESERVE_ADDRESS_PDA: PublicKey;
// export let TEMP_ACCOUNT_PDA: PublicKey;

// const initConstants = async () => {
//   WITHDRAW_AUTHORITY_PDA = (
//     await PublicKey.findProgramAddress(
//       [STAKE_POOL_ID.toBuffer(), Buffer.from('withdraw')],
//       TENDERIZE_PROGRAM_ID
//     )
//   )[0];
//   DEPOSIT_AUTHORITY_PDA = (
//     await PublicKey.findProgramAddress(
//       [STAKE_POOL_ID.toBuffer(), Buffer.from('deposit')],
//       TENDERIZE_PROGRAM_ID
//     )
//   )[0];
//   RESERVE_ADDRESS_PDA = (
//     await PublicKey.findProgramAddress(
//       [STAKE_POOL_ID.toBuffer(), Buffer.from('reserve')],
//       TENDERIZE_PROGRAM_ID
//     )
//   )[0];
//   TEMP_ACCOUNT_PDA = (
//     await PublicKey.findProgramAddress(
//       [STAKE_POOL_ID.toBuffer(), Buffer.from('temp')],
//       TENDERIZE_PROGRAM_ID
//     )
//   )[0];
// };

// initConstants();

export const PROGRAM_IDS = [
  {
    name: 'mainnet-beta',
  },
  {
    name: 'testnet',
  },
  {
    name: 'devnet',
  },
  {
    name: 'localnet',
  },
];

export const setProgramIds = (envName: string) => {
  let instance = PROGRAM_IDS.find((env) => env.name === envName);
  if (!instance) {
    return;
  }
};

export const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
    // tenderize: TENDERIZE_PROGRAM_ID,
  };
};
