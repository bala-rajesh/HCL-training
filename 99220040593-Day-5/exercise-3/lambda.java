import java.util.*;

public class lambda {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        list.add(6);
        list.add(7);
        list.add(8);
        list.add(9);
        list.add(10);
        list.forEach(n -> System.out.println(n));
        System.out.println("Even numbers");
        list.forEach(n -> {
            if (n % 2 != 0) {
                System.out.println(n);
            }
        });

    }
}
