package com.banking.model;

import com.banking.exception.InsufficientFundsException;

public class SavingsAccount extends Account {
    private static final double INTEREST_RATE = 0.04; // 4% annual
    private int minBalance = 1000;

    public SavingsAccount(String accountNumber, String holderName, String holderAadhaar, double initialBalance) {
        super(accountNumber, holderName, holderAadhaar, initialBalance, AccountType.SAVINGS);
    }

    @Override
    public boolean withdraw(double amount, String description) throws InsufficientFundsException {
        if (!isActive || amount <= 0)
            return false;
        if (balance - amount < minBalance) {
            throw new InsufficientFundsException("Minimum balance ₹" + minBalance + " required");
        }
        balance -= amount;
        transactions.add(new Transaction(TransactionType.WITHDRAWAL, amount, balance, description));
        return true;
    }

    @Override
    public void calculateInterest() {
        double interest = balance * INTEREST_RATE / 12; // Monthly
        deposit(interest, "Monthly Interest");
    }
}
