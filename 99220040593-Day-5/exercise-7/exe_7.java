import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class exe_7 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        Function<Integer, Integer> square = number -> number * number;

        numbers.stream().map(square).forEach(System.out::println);
    }
}