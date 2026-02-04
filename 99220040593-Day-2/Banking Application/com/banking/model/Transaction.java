package com.banking.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class Transaction implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;
    private TransactionType type;
    private double amount;
    private double balanceAfter;
    private LocalDateTime timestamp;
    private String description;

    public Transaction(TransactionType type, double amount, double balanceAfter, String description) {
        this.id = UUID.randomUUID().toString().substring(0, 8);
        this.type = type;
        this.amount = amount;
        this.balanceAfter = balanceAfter;
        this.timestamp = LocalDateTime.now();
        this.description = description;
    }

    // Getters
    public String getId() {
        return id;
    }

    public TransactionType getType() {
        return type;
    }

    public double getAmount() {
        return amount;
    }

    public double getBalanceAfter() {
        return balanceAfter;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format("%s [%s] $%.2f | Bal: $%.2f | %s",
                timestamp.format(DateTimeFormatter.ofPattern("dd/MM HH:mm")),
                type, amount, balanceAfter, description);
    }
}
