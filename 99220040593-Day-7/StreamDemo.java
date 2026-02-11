import java.util.Arrays;
import java.util.List;

class StreamDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Bala", "Rajesh", "Kumar", "Suresh", "Mahesh");
        names.stream().filter(name -> name.startsWith("B")).forEach(System.out::println);
    }
}