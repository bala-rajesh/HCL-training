import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class exe_6 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        Consumer<Integer> printNumber = number -> System.out.println(number);
        Consumer<Integer> consumer1 = System.out::println;
        numbers.forEach(printNumber);
        numbers.forEach(consumer1);
    }
}
