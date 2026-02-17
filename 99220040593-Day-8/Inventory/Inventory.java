import java.util.HashMap;
import java.util.Map;

public class Inventory {
    private Map<String, Product> products;

    public Inventory() {
        this.products = new HashMap<>();
    }

    public void addProduct(Product product) {
        products.put(product.getId(), product);
        System.out.println("Product added successfully.");
    }

    public void removeProduct(String id) throws ProductNotFoundException {
        if (!products.containsKey(id)) {
            throw new ProductNotFoundException("Product with ID " + id + " not found.");
        }
        products.remove(id);
        System.out.println("Product removed successfully.");
    }

    public void updateStock(String id, int quantity)
            throws ProductNotFoundException, InvalidQuantityException, InsufficientStockException {
        if (!products.containsKey(id)) {
            throw new ProductNotFoundException("Product with ID " + id + " not found.");
        }
        Product product = products.get(id);
        int newQuantity = product.getQuantity() + quantity;

        if (newQuantity < 0) {
            throw new InsufficientStockException("Insufficient stock. Current quantity: " + product.getQuantity()
                    + ", Requested reduction: " + Math.abs(quantity));
        }

        product.setQuantity(newQuantity);
        System.out.println("Stock updated successfully. New Quantity: " + newQuantity);
    }

    public Product searchProduct(String id) throws ProductNotFoundException {
        if (!products.containsKey(id)) {
            throw new ProductNotFoundException("Product with ID " + id + " not found.");
        }
        return products.get(id);
    }
}
