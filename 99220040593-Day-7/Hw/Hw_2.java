import java.util.*;
import java.util.stream.*;

public class Hw_2 {
    public static void main(String[] args) {
        List<List<Integer>> numbers = Arrays.asList(
                Arrays.asList(1, 2, 3),
                Arrays.asList(4, 5),
                Arrays.asList(6, 7, 8));

        List<Integer> evenNumbers = numbers.stream()
                .flatMap(List::stream)
                .filter(n -> n % 2 == 0)
                .collect(Collectors.toList());

        System.out.println(evenNumbers);
    }
}
