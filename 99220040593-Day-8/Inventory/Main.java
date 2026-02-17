import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Inventory inventory = new Inventory();
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n--- Inventory Management System ---");
            System.out.println("1. Add Product");
            System.out.println("2. Remove Product");
            System.out.println("3. Update Stock");
            System.out.println("4. Search Product");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");

            try {
                choice = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
                choice = 0; // Reset choice to loop again
            }

            switch (choice) {
                case 1:
                    System.out.print("Enter Product ID: ");
                    String id = scanner.nextLine();
                    System.out.print("Enter Product Name: ");
                    String name = scanner.nextLine();

                    int quantity = 0;
                    try {
                        System.out.print("Enter Quantity: ");
                        quantity = Integer.parseInt(scanner.nextLine());
                        if (quantity < 0) {
                            throw new InvalidQuantityException("Quantity cannot be negative.");
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid quantity format.");
                        break;
                    } catch (InvalidQuantityException e) {
                        System.out.println("Error: " + e.getMessage());
                        break;
                    }

                    double price = 0;
                    try {
                        System.out.print("Enter Price: ");
                        price = Double.parseDouble(scanner.nextLine());
                        if (price < 0) {
                            System.out.println("Price cannot be negative.");
                            break;
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid price format.");
                        break;
                    }

                    inventory.addProduct(new Product(id, name, quantity, price));
                    break;

                case 2:
                    System.out.print("Enter Product ID to remove: ");
                    String removeId = scanner.nextLine();
                    try {
                        inventory.removeProduct(removeId);
                    } catch (ProductNotFoundException e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                    break;

                case 3:
                    System.out.print("Enter Product ID to update: ");
                    String updateId = scanner.nextLine();

                    int updateQuantity = 0;
                    try {
                        System.out.print("Enter quantity change (positive to add, negative to remove): ");
                        updateQuantity = Integer.parseInt(scanner.nextLine());
                        inventory.updateStock(updateId, updateQuantity);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid quantity format.");
                    } catch (ProductNotFoundException | InvalidQuantityException | InsufficientStockException e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                    break;

                case 4:
                    System.out.print("Enter Product ID to search: ");
                    String searchId = scanner.nextLine();
                    try {
                        Product product = inventory.searchProduct(searchId);
                        System.out.println("Product Found: " + product);
                    } catch (ProductNotFoundException e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                    break;

                case 5:
                    System.out.println("Exiting...");
                    break;

                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 5);

        scanner.close();
    }
}
