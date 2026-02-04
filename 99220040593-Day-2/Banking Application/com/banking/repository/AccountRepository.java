package com.banking.repository;

import com.banking.model.Account;
import com.banking.exception.AccountNotFoundException;
import java.util.List;

public interface AccountRepository {
    void saveAll(List<Account> accounts);

    List<Account> loadAll();

    void addAccount(Account account);

    Account findAccount(String accountNumber) throws AccountNotFoundException;

    List<Account> getAllAccounts();
}
