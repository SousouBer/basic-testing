// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import _ from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;

    const bankAccount = new BankAccount(initialBalance);
    const bankBalance = bankAccount.getBalance();

    expect(bankBalance).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdrawAmount = 150;

    const insfErrMessage = `Insufficient funds: cannot withdraw more than ${initialBalance}`;

    const bankAccount = new BankAccount(initialBalance);
    const withdrawOperation = () => bankAccount.withdraw(withdrawAmount);

    expect(withdrawOperation).toThrowError(InsufficientFundsError);
    expect(withdrawOperation).toThrow(insfErrMessage);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const transferAmount = 150;

    const bankAccount = new BankAccount(initialBalance);
    const otherBankAccount = new BankAccount(initialBalance);

    const transferOperation = () =>
      bankAccount.transfer(transferAmount, otherBankAccount);

    expect(transferOperation).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transferAmount = 150;

    const transferErrMessage = 'Transfer failed';

    const bankAccount = new BankAccount(initialBalance);

    const transferOperation = () =>
      bankAccount.transfer(transferAmount, bankAccount);

    expect(transferOperation).toThrowError(TransferFailedError);
    expect(transferOperation).toThrow(transferErrMessage);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 150;

    const bankAccount = new BankAccount(initialBalance);

    bankAccount.deposit(depositAmount);

    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toEqual(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawAmount = 50;

    const bankAccount = new BankAccount(initialBalance);

    bankAccount.withdraw(withdrawAmount);

    const currentBalance = bankAccount.getBalance();

    expect(currentBalance).toEqual(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const transferAmount = 50;

    const bankAccount = new BankAccount(initialBalance);
    const otherBankAccount = new BankAccount(initialBalance);

    bankAccount.transfer(transferAmount, otherBankAccount);

    const currentBalance = bankAccount.getBalance();
    const otherCurrentBalance = otherBankAccount.getBalance();

    expect(currentBalance).toEqual(initialBalance - transferAmount);
    expect(otherCurrentBalance).toEqual(initialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = new BankAccount(100);

    const resolvedValue = 50;

    const randomSpy = jest.spyOn(_, 'random');
    randomSpy.mockReturnValue(resolvedValue);

    await expect(bankAccount.fetchBalance()).resolves.toBe(resolvedValue);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = new BankAccount(100);

    const resolvedValue = 50;

    const fetchBalanceSpy = jest.spyOn(bankAccount, 'fetchBalance');
    fetchBalanceSpy.mockResolvedValue(resolvedValue);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(resolvedValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = new BankAccount(100);

    const resolvedValue = null;
    const syncErrMessage = 'Synchronization failed';

    const fetchBalanceSpy = jest.spyOn(bankAccount, 'fetchBalance');
    fetchBalanceSpy.mockResolvedValue(resolvedValue);

    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );

    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
      syncErrMessage,
    );
  });
});
