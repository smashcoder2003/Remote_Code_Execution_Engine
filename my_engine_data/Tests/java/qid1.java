public class qid1 {
    public static void main(String[] args) {
        int[] arr = {1, 4, 5, 6, 7};
        Solution.mergesort(arr, 0, {1, 4, 5, 6, 7}.length - 1);
        for (int i= 0; i < arr.length; i++) {
            int[] expected = {1, 4, 5, 6,7};
            System.out.print(arr[i] == expected[i]);
        }
        System.out.println("Ran One test");
    }
}

