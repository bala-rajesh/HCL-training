package com.banking.exception;

public class AccountNotFoundException extends Exception {
    public AccountNotFoundException(String accountNumber) {
        super("Account " + accountNumber + " not found!");
    }
}
