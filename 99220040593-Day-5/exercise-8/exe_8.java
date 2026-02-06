import java.util.*;
import java.util.stream.*;

public class exe_8 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        numbers.stream().filter(number -> number % 2 == 0).forEach(System.out::println);
        List<String> names = Arrays.asList("Bala", "Rajesh", "Kumar", "Suresh", "Mahesh");

        names.stream().filter(name -> name.length() > 4).forEach(System.out::println);

        String[] arr = { "A", "B", "C", "D", "E" };
        Stream.of(arr).forEach(System.out::println);
    }
}