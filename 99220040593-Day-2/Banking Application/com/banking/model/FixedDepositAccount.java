package com.banking.model;

import com.banking.exception.InsufficientFundsException;
import java.time.LocalDateTime;

public class FixedDepositAccount extends Account {
    private LocalDateTime maturityDate;
    private double interestRate;

    public FixedDepositAccount(String accountNumber, String holderName, String holderAadhaar,
            double principal, int tenureMonths, double rate) {
        super(accountNumber, holderName, holderAadhaar, principal, AccountType.FIXED_DEPOSIT);
        this.interestRate = rate;
        this.maturityDate = LocalDateTime.now().plusMonths(tenureMonths);
    }

    @Override
    public boolean withdraw(double amount, String description) throws InsufficientFundsException {
        if (LocalDateTime.now().isBefore(maturityDate)) {
            throw new InsufficientFundsException("FD not matured yet. Maturity: " + maturityDate);
        }
        if (balance < amount) {
            throw new InsufficientFundsException("Insufficient funds in FD. Balance: " + balance);
        }
        balance -= amount;
        transactions.add(new Transaction(TransactionType.WITHDRAWAL, amount, balance, description));
        return true;
    }

    @Override
    public void calculateInterest() {
        if (LocalDateTime.now().isAfter(maturityDate)) {
            double interest = balance * interestRate * 1; // Simple interest
            deposit(interest, "FD Maturity Interest");
        }
    }

    public LocalDateTime getMaturityDate() {
        return maturityDate;
    }
}
