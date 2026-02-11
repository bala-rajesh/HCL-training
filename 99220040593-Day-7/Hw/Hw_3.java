import java.util.*;
import java.util.stream.*;

public class Hw_3 {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
                new Employee("Raj", "IT", 50000),
                new Employee("Anil", "HR", 40000),
                new Employee("Kiran", "IT", 60000));

        Map<String, List<String>> result = employees.stream()
                .collect(Collectors.groupingBy(
                        e -> e.department,
                        Collectors.mapping(e -> e.name, Collectors.toList())));

        System.out.println(result);
    }
}

class Employee {
    String name;
    String department;
    int salary;

    Employee(String name, String department, int salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }
}
