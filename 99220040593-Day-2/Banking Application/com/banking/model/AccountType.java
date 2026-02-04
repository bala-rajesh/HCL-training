package com.banking.model;

public enum AccountType {
    SAVINGS("SAV"), CURRENT("CUR"), FIXED_DEPOSIT("FD");

    private String code;

    AccountType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
