import java.util.*;
import java.util.stream.*;

public class Hw_1 {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Raj", "Anil", "Kiran", "Ravi", "Aman");

        List<String> result = names.stream()
                .filter(name -> name.startsWith("A"))
                .map(String::toUpperCase)
                .sorted()
                .collect(Collectors.toList());

        System.out.println(result);
    }
}
