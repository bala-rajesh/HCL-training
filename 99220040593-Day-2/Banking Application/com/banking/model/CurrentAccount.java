package com.banking.model;

import com.banking.exception.InsufficientFundsException;

public class CurrentAccount extends Account {
    private double overdraftLimit;

    public CurrentAccount(String accountNumber, String holderName, String holderAadhaar,
            double initialBalance, double overdraftLimit) {
        super(accountNumber, holderName, holderAadhaar, initialBalance, AccountType.CURRENT);
        this.overdraftLimit = overdraftLimit;
    }

    @Override
    public boolean withdraw(double amount, String description) throws InsufficientFundsException {
        if (!isActive || amount <= 0)
            return false;
        double availableBalance = balance + overdraftLimit;
        if (availableBalance < amount) {
            throw new InsufficientFundsException("Insufficient funds. Available: ₹" + availableBalance);
        }
        balance -= amount;
        transactions.add(new Transaction(TransactionType.WITHDRAWAL, amount, balance, description));
        return true;
    }

    @Override
    public void calculateInterest() {
        // No interest for current accounts
    }

    public double getOverdraftLimit() {
        return overdraftLimit;
    }
}
