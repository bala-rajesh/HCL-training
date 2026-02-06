public class Lambda_2 {
    public static void main(String[] args) {
        Lamb_2 l_2 = (a, b) -> a + b;
        System.out.println(l_2.operation(10, 20));

        Lamb_2 l_3 = (a, b) -> a * b;
        System.out.println(l_3.operation(10, 20));

    }
}

@FunctionalInterface
interface Lamb_2 {
    int operation(int a, int b);
}
