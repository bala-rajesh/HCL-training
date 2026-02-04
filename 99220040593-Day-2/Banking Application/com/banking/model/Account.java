package com.banking.model;

import com.banking.exception.InsufficientFundsException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public abstract class Account implements Serializable {
    private static final long serialVersionUID = 1L;

    protected String accountNumber;
    protected String holderName;
    protected String holderAadhaar;
    protected double balance;
    protected AccountType type;
    protected List<Transaction> transactions;
    protected boolean isActive;

    protected Account(String accountNumber, String holderName, String holderAadhaar,
            double initialBalance, AccountType type) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.holderAadhaar = holderAadhaar;
        this.balance = initialBalance;
        this.type = type;
        this.transactions = new ArrayList<>();
        this.isActive = true;
        // Log initial deposit
        transactions.add(new Transaction(TransactionType.DEPOSIT, initialBalance, balance, "Account Opening"));
    }

    // Abstract Methods
    public abstract boolean withdraw(double amount, String description) throws InsufficientFundsException;

    public abstract void calculateInterest();

    // Common Methods
    public void deposit(double amount, String description) {
        if (amount > 0 && isActive) {
            balance += amount;
            transactions.add(new Transaction(TransactionType.DEPOSIT, amount, balance, description));
        }
    }

    // Getters/Setters
    public String getAccountNumber() {
        return accountNumber;
    }

    public String getHolderName() {
        return holderName;
    }

    public double getBalance() {
        return balance;
    }

    public AccountType getType() {
        return type;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @Override
    public String toString() {
        return String.format("%s | %s | %s | $%.2f | %s",
                accountNumber, holderName, type.getCode(), balance, isActive ? "Active" : "Inactive");
    }
}
