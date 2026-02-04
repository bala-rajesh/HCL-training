package com.banking.main;

import com.banking.model.AccountType;
import com.banking.service.BankService;
import com.banking.service.BankServiceImpl;
import com.banking.repository.FileAccountRepository;
import java.util.Scanner;

public class BankingApp {

    private static BankService bankService;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Initialize dependencies
        // Using "accounts.ser" for the new data format to avoid conflict/error with old
        // "bank_data.ser"
        FileAccountRepository repository = new FileAccountRepository("accounts.ser");
        bankService = new BankServiceImpl(repository, "INDIAN BANK", "INDI0000001");

        System.out.println("🏦 Welcome to Abstracted Banking System!");

        while (true) {
            displayMenu();
            int choice = sc.nextInt();
            sc.nextLine();

            try {
                switch (choice) {
                    case 1 -> createAccount(sc);
                    case 2 -> depositWithdraw(sc, true);
                    case 3 -> depositWithdraw(sc, false);
                    case 4 -> transferFunds(sc);
                    case 5 -> bankService.calculateInterest();
                    case 6 -> System.out.println(bankService.generateSummaryReport());
                    case 7 -> showTransactions(sc);
                    case 8 -> {
                        bankService.saveData();
                        System.out.println("👋 Thank you for banking!");
                        return;
                    }
                    default -> System.out.println("❌ Invalid option!");
                }
            } catch (Exception e) {
                System.out.println("❌ Error: " + e.getMessage());
            }
        }
    }

    private static void displayMenu() {
        System.out.println("\n📋 MENU:");
        System.out.println("1.  Create Account");
        System.out.println("2.  Deposit");
        System.out.println("3.  Withdraw");
        System.out.println("4.  Transfer");
        System.out.println("5.  Apply Interest");
        System.out.println("6.  Bank Summary");
        System.out.println("7.  Transactions");
        System.out.println("8.  Save & Exit");
        System.out.print("👉 Choose: ");
    }

    private static void createAccount(Scanner sc) {
        System.out.print("Name: ");
        String name = sc.nextLine();
        System.out.print("Aadhaar: ");
        String aadhaar = sc.nextLine();
        System.out.print("Initial Deposit: ₹");
        double deposit = sc.nextDouble();

        System.out.println("Account Type: 1-Savings 2-Current 3-FD");
        int type = sc.nextInt();
        AccountType accType = switch (type) {
            case 1 -> AccountType.SAVINGS;
            case 2 -> AccountType.CURRENT;
            case 3 -> AccountType.FIXED_DEPOSIT;
            default -> AccountType.SAVINGS;
        };

        if (type == 2) {
            System.out.print("Overdraft Limit: ₹");
            double overdraft = sc.nextDouble();
            bankService.createAccount(name, aadhaar, accType, deposit, overdraft);
        } else if (type == 3) {
            System.out.print("Tenure (months): ");
            int tenure = sc.nextInt();
            System.out.print("Interest Rate (%): ");
            double rate = sc.nextDouble();
            bankService.createAccount(name, aadhaar, accType, deposit, (double) tenure, rate);
        } else {
            bankService.createAccount(name, aadhaar, accType, deposit);
        }
    }

    private static void depositWithdraw(Scanner sc, boolean isDeposit) {
        try {
            System.out.print("Account Number: ");
            String accNum = sc.nextLine();
            System.out.print(isDeposit ? "Deposit" : "Withdraw" + " amount: ₹");
            double amount = sc.nextDouble();
            sc.nextLine();

            if (isDeposit) {
                bankService.deposit(accNum, amount, "Manual Deposit");
            } else {
                bankService.withdraw(accNum, amount, "ATM/Manual Withdrawal");
            }
            System.out.println("✅ Transaction Successful");
        } catch (Exception e) {
            System.out.println("❌ " + e.getMessage());
        }
    }

    private static void transferFunds(Scanner sc) {
        try {
            System.out.print("From Account: ");
            String fromAcc = sc.nextLine();
            System.out.print("To Account: ");
            String toAcc = sc.nextLine();
            System.out.print("Amount: ₹");
            double amount = sc.nextDouble();

            bankService.transfer(fromAcc, toAcc, amount, "Fund Transfer");
            System.out.println("✅ Transfer successful!");
        } catch (Exception e) {
            System.out.println("❌ " + e.getMessage());
        }
    }

    private static void showTransactions(Scanner sc) {
        try {
            System.out.print("Account Number: ");
            String accNum = sc.nextLine();
            System.out.println("\n📊 Last 10 Transactions:");
            bankService.getLastTransactions(accNum, 10)
                    .forEach(System.out::println);
        } catch (Exception e) {
            System.out.println("❌ " + e.getMessage());
        }
    }
}
