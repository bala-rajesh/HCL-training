package com.banking.service;

import com.banking.repository.AccountRepository;
import com.banking.model.*;
import com.banking.exception.AccountNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

public class BankServiceImpl implements BankService {
    private AccountRepository accountRepository;
    private String bankName;
    private String ifscCode;

    public BankServiceImpl(AccountRepository accountRepository, String bankName, String ifscCode) {
        this.accountRepository = accountRepository;
        this.bankName = bankName;
        this.ifscCode = ifscCode;
    }

    // Factory Method to generate Account Number
    private String generateAccountNumber(AccountType type) {
        return type.getCode() + System.currentTimeMillis() % 1000000;
    }

    @Override
    public void createAccount(String holderName, String aadhaar, AccountType type,
            double initialDeposit, Double... extraParams) {
        String accNum = generateAccountNumber(type);
        Account account;
        switch (type) {
            case SAVINGS:
                account = new SavingsAccount(accNum, holderName, aadhaar, initialDeposit);
                break;
            case CURRENT:
                account = new CurrentAccount(accNum, holderName, aadhaar, initialDeposit, extraParams[0]);
                break;
            case FIXED_DEPOSIT:
                account = new FixedDepositAccount(accNum, holderName, aadhaar, initialDeposit,
                        extraParams[0].intValue(), extraParams[1]);
                break;
            default:
                return;
        }
        accountRepository.addAccount(account);
        System.out.println("✅ Account created: " + account);
    }

    @Override
    public void deposit(String accountNumber, double amount, String description) throws AccountNotFoundException {
        Account acc = accountRepository.findAccount(accountNumber);
        acc.deposit(amount, description);
    }

    @Override
    public void withdraw(String accountNumber, double amount, String description) throws Exception {
        Account acc = accountRepository.findAccount(accountNumber);
        acc.withdraw(amount, description);
    }

    @Override
    public void transfer(String fromAccount, String toAccount, double amount, String description) throws Exception {
        Account from = accountRepository.findAccount(fromAccount);
        Account to = accountRepository.findAccount(toAccount);

        if (from.withdraw(amount, description + " to " + to.getAccountNumber())) {
            to.deposit(amount, description + " from " + from.getAccountNumber());
        }
    }

    @Override
    public void calculateInterest() {
        for (Account acc : accountRepository.getAllAccounts()) {
            acc.calculateInterest();
        }
    }

    @Override
    public String generateSummaryReport() {
        StringBuilder report = new StringBuilder();
        report.append("\n🏦 ").append(bankName).append(" - IFSC: ").append(ifscCode).append("\n");
        List<Account> accounts = accountRepository.getAllAccounts();
        report.append("Total Accounts: ").append(accounts.size()).append("\n");
        report.append("Total Balance: ₹").append(
                accounts.stream().mapToDouble(Account::getBalance).sum()).append("\n\n");

        accounts.forEach(acc -> {
            report.append(acc).append("\n");
        });
        return report.toString();
    }

    @Override
    public List<Transaction> getLastTransactions(String accountNumber, int n) throws AccountNotFoundException {
        Account acc = accountRepository.findAccount(accountNumber);
        return acc.getTransactions().stream()
                .sorted((t1, t2) -> t2.getTimestamp().compareTo(t1.getTimestamp()))
                .limit(n)
                .collect(Collectors.toList());
    }

    @Override
    public Account findAccount(String accountNumber) throws AccountNotFoundException {
        return accountRepository.findAccount(accountNumber);
    }

    @Override
    public void saveData() {
        accountRepository.saveAll(accountRepository.getAllAccounts());
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.getAllAccounts();
    }
}
