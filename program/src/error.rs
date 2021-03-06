//! Error types

use num_derive::FromPrimitive;
use solana_program::{decode_error::DecodeError, program_error::ProgramError};
use thiserror::Error;

/// Errors that may be returned by the StakePool program.
#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum StakePoolError {
    /// The account cannot be initialized because it is already being used.
    #[error("AlreadyInUse")]
    AlreadyInUse,
    /// The program address provided doesn't match the value generated by the program.
    #[error("InvalidProgramAddress")]
    InvalidProgramAddress,
    /// The stake pool state is invalid.
    #[error("InvalidState")]
    InvalidState,
    /// The calculation failed.
    #[error("CalculationFailure")]
    CalculationFailure,
    /// Stake pool fee > 1.
    #[error("FeeTooHigh")]
    FeeTooHigh,
    /// Token account is associated with the wrong mint.
    #[error("WrongAccountMint")]
    WrongAccountMint,
    /// Account balance should be zero.
    #[error("NonZeroBalance")]
    NonZeroBalance,
    /// Wrong pool owner account.
    #[error("WrongOwner")]
    WrongOwner,
    /// Required signature is missing.
    #[error("SignatureMissing")]
    SignatureMissing,
    /// Invalid validator stake list account.
    #[error("InvalidValidatorStakeList")]
    InvalidValidatorStakeList,
    /// Invalid owner fee account.
    #[error("InvalidFeeAccount")]
    InvalidFeeAccount,
    /// Specified pool mint account is wrong.
    #[error("WrongPoolMint")]
    WrongPoolMint,
    /// Stake account is not in the state expected by the program.
    #[error("WrongStakeState")]
    WrongStakeState,
    /// User stake is not active
    #[error("UserStakeNotActive")]
    UserStakeNotActive,
    /// Stake account voting for this validator already exists in the pool.
    #[error("ValidatorAlreadyAdded")]
    ValidatorAlreadyAdded,
    /// Stake account for this validator not found in the pool.
    #[error("ValidatorNotFound")]
    ValidatorNotFound,
    /// Stake account address not properly derived from the validator address.
    #[error("InvalidStakeAccountAddress")]
    InvalidStakeAccountAddress,
    /// Identify validator stake accounts with old balances and update them.
    #[error("StakeListOutOfDate")]
    StakeListOutOfDate,
    /// First update old validator stake account balances and then pool stake balance.
    #[error("StakeListAndPoolOutOfDate")]
    StakeListAndPoolOutOfDate,
    /// Validator stake account is not found in the list storage.
    #[error("UnknownValidatorStakeAccount")]
    UnknownValidatorStakeAccount,
    /// Wrong minting authority set for mint pool account
    #[error("WrongMintingAuthority")]
    WrongMintingAuthority,
    /// Mint has initial supply
    #[error("MintHasInitialSupply")]
    MintHasInitialSupply,
    /// Account is not rent-exempt
    #[error("AccountNotRentExempt")]
    AccountNotRentExempt,
    /// Validator list is full. Can't add more validators
    #[error("ValidatorListOverflow")]
    ValidatorListOverflow,
    /// Withdraw all stakes before validator removal
    #[error("ValidatorHasStakes")]
    ValidatorHasStakes,
    /// First deposit must be greater than empty account rent
    #[error("FirstDepositIsTooSmall")]
    FirstDepositIsTooSmall,
    /// Wrong credit owner
    #[error("WrongCreditOwner")]
    WrongCreditOwner,
    /// Wrong credit state
    #[error("WrongCreditState")]
    WrongCreditState,
    /// Stake index is too big
    #[error("InvalidStakeIndex")]
    InvalidStakeIndex,
    /// Credit list overflow
    #[error("CreditListOverfow")]
    CreditListOverfow,
    /// UnknownCreditor
    #[error("UnknownCreditor")]
    UnknownCreditor,
}
impl From<StakePoolError> for ProgramError {
    fn from(e: StakePoolError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
impl<T> DecodeError<T> for StakePoolError {
    fn type_of() -> &'static str {
        "Stake Pool Error"
    }
}
