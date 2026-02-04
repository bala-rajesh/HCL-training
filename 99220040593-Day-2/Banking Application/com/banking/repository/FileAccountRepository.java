package com.banking.repository;

import com.banking.model.Account;
import com.banking.exception.AccountNotFoundException;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class FileAccountRepository implements AccountRepository {
    private List<Account> accounts;
    private String filename;

    public FileAccountRepository(String filename) {
        this.filename = filename;
        this.accounts = loadAll();
    }

    @Override
    public void saveAll(List<Account> accounts) {
        saveToDisk();
    }

    // Helper to save current state
    public void saveToDisk() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filename))) {
            oos.writeObject(accounts);
            System.out.println("💾 Data saved to " + filename);
        } catch (IOException e) {
            System.err.println("❌ Save failed: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Account> loadAll() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filename))) {
            List<Account> loadedParams = (List<Account>) ois.readObject();
            if (loadedParams != null) {
                return loadedParams;
            }
        } catch (Exception e) {
            // File not found or empty, return new list
        }
        return new ArrayList<>();
    }

    @Override
    public void addAccount(Account account) {
        accounts.add(account);
    }

    @Override
    public Account findAccount(String accountNumber) throws AccountNotFoundException {
        return accounts.stream()
                .filter(acc -> acc.getAccountNumber().equals(accountNumber))
                .findFirst()
                .orElseThrow(() -> new AccountNotFoundException(accountNumber));
    }

    @Override
    public List<Account> getAllAccounts() {
        return accounts;
    }
}
