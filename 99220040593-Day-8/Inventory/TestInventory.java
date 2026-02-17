
public class TestInventory {
    public static void main(String[] args) {
        Inventory inventory = new Inventory();
        System.out.println("Starting Automated Tests...");

        // Test 1: Add Product
        try {
            inventory.addProduct(new Product("P001", "Laptop", 10, 1500.00));
            System.out.println("Test 1 Passed: Product added.");
        } catch (Exception e) {
            System.out.println("Test 1 Failed: " + e.getMessage());
        }

        // Test 2: Search Product
        try {
            inventory.searchProduct("P001");
            System.out.println("Test 2 Passed: Product found.");
        } catch (ProductNotFoundException e) {
            System.out.println("Test 2 Failed: " + e.getMessage());
        }

        // Test 3: Search Non-existent Product (Expect Exception)
        try {
            inventory.searchProduct("P999");
            System.out.println("Test 3 Failed: Exception not thrown for missing product.");
        } catch (ProductNotFoundException e) {
            System.out.println("Test 3 Passed: ProductNotFoundException caught as expected.");
        }

        // Test 4: Remove Product
        try {
            inventory.removeProduct("P001");
            System.out.println("Test 4 Passed: Product removed.");
        } catch (ProductNotFoundException e) {
            System.out.println("Test 4 Failed: " + e.getMessage());
        }

        // Test 5: Remove Non-existent Product (Expect Exception)
        try {
            inventory.removeProduct("P001"); // Already removed
            System.out.println("Test 5 Failed: Exception not thrown for removing missing product.");
        } catch (ProductNotFoundException e) {
            System.out.println("Test 5 Passed: ProductNotFoundException caught as expected.");
        }

        // Test 6: Insufficient Stock
        try {
            inventory.addProduct(new Product("P002", "Phone", 5, 800.00));
            inventory.updateStock("P002", -10);
            System.out.println("Test 6 Failed: InsufficientStockException not thrown.");
        } catch (InsufficientStockException e) {
            System.out.println("Test 6 Passed: InsufficientStockException caught as expected: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Test 6 Failed: Wrong exception thrown: " + e.getClass().getName());
        }

        System.out.println("Tests Completed.");
    }
}
