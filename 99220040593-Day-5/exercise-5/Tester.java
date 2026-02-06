import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

public class Tester {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        Predicate<Integer> isEven = (n) -> n % 2 == 0;
        list = list.stream().filter(isEven).toList();
        System.out.println(list);

    }
}
