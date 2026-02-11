import java.util.*;
import java.util.stream.*;

public class Hw_4 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 15, 20, 25, 30);

        Map<Boolean, Long> result = numbers.stream()
                .collect(Collectors.partitioningBy(
                        n -> n > 20,
                        Collectors.counting()));

        System.out.println(result);
    }
}
