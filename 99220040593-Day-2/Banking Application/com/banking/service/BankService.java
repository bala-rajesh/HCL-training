package com.banking.service;

import com.banking.model.Account;
import com.banking.model.AccountType;
import com.banking.model.Transaction;
import com.banking.exception.AccountNotFoundException;
import java.util.List;

public interface BankService {
    void createAccount(String holderName, String aadhaar, AccountType type, double initialDeposit,
            Double... extraParams);

    void deposit(String accountNumber, double amount, String description) throws AccountNotFoundException;

    void withdraw(String accountNumber, double amount, String description) throws Exception;

    void transfer(String fromAccount, String toAccount, double amount, String description) throws Exception;

    void calculateInterest();

    String generateSummaryReport();

    List<Transaction> getLastTransactions(String accountNumber, int n) throws AccountNotFoundException;

    Account findAccount(String accountNumber) throws AccountNotFoundException;

    void saveData();

    List<Account> getAllAccounts();
}
