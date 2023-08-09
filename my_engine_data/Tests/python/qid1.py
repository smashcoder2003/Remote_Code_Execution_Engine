import unittest
from solution import my_sort


class qid1test(unittest.TestCase):
   def test1(self):
      arr = [1, 5, -7, 2, 1]
      result = self.assertEqual(my_sort(arr, 0, len(arr)-1),[-7, 1, 1, 2, 5])

   def test2(self):
      arr = [1, 5, -7, 2, 1]
      result = self.assertEqual(my_sort(arr, 0, len(arr)-1),[-7, 1, 1, 2, 5])

   def test3(self):
      arr = [1, 5, -7, 2, 1]
      result = self.assertEqual(my_sort(arr, 0, len(arr)-1),[-7, 1, 1, 2, 5])

   def test_mixed_large_range(self):
    arr = [100, -100, 50, -50, 0]
    self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-100, -50, 0, 50, 100])

   def test_almost_sorted(self):
        arr = [1, 2, 4, 3, 5, 7, 6, 8, 9]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 2, 3, 4, 5, 6, 7, 8, 9])

   def test_odd_length(self):
        arr = [7, 3, 9, 5, 1]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 3, 5, 7, 9])

   def test_negative_odd_length(self):
        arr = [-7, -3, -9, -5, -1]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-9, -7, -5, -3, -1])

   def test_duplicates_and_zeros(self):
        arr = [2, 0, 3, 2, 1, 0, 1, 3]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [0, 0, 1, 1, 2, 2, 3, 3])

   def test_large_duplicate_elements(self):
        arr = [5, 5, 5, 5, 5, 5, 5]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [5, 5, 5, 5, 5, 5, 5])

   def test_large_negative_values(self):
        arr = [-1000, -500, -750, -300]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-1000, -750, -500, -300])

   def test_already_sorted_descending(self):
        arr = [5, 4, 3, 2, 1]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 2, 3, 4, 5])

   def test_mixed_large_range_odd_length(self):
        arr = [500, -100, 200, -50, 0]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-100, -50, 0, 200, 500])

   def test_large_range_odd_length(self):
        arr = [100, 200, -300, 400, -500, 600, -700]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-700, -500, -300, 100, 200, 400, 600])

   def test_repeated_pattern(self):
        arr = [1, 2, 3, 1, 2, 3, 1, 2, 3]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 1, 1, 2, 2, 2, 3, 3, 3])

   def test_large_random_numbers(self):
        arr = [987654321, 123456789, 555555555, 111111111]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [111111111, 123456789, 555555555, 987654321])

   def test_odd_length_reverse(self):
        arr = [9, 7, 5, 3, 1]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 3, 5, 7, 9])

   def test_almost_sorted_odd_length(self):
        arr = [1, 3, 2, 5, 4, 7, 6, 9, 8]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 2, 3, 4, 5, 6, 7, 8, 9])

   def test_large_mixed_values(self):
        arr = [100, -5, 0, -1000, 500, 200, -300, 0, -200, 300]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-1000, -300, -200, -5, 0, 0, 100, 200, 300, 500])

   def test_large_duplicates(self):
        arr = [9, 5, 3, 9, 5, 3, 9, 5, 3]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [3, 3, 3, 5, 5, 5, 9, 9, 9])

   def test1(self):
      arr = [1, 5, -7, 2, 1]
      result = self.assertEqual(my_sort(arr, 0, len(arr)-1),[-7, 1, 1, 2, 5])

   def test2(self):
      arr = [1, 5, -7, 2, 1]
      result = self.assertEqual(my_sort(arr, 0, len(arr)-1),[-7, 1, 1, 2, 5])

   def test3(self):
      arr = [1, 5, -7, 2, 1]
      result = self.assertEqual(my_sort(arr, 0, len(arr)-1),[-7, 1, 1, 2, 5])

   def test_mixed_large_range(self):
    arr = [100, -100, 50, -50, 0]
    self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-100, -50, 0, 50, 100])

   def test_almost_sorted(self):
        arr = [1, 2, 4, 3, 5, 7, 6, 8, 9]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 2, 3, 4, 5, 6, 7, 8, 9])

   def test_odd_length(self):
        arr = [7, 3, 9, 5, 1]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 3, 5, 7, 9])

   def test_negative_odd_length(self):
        arr = [-7, -3, -9, -5, -1]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-9, -7, -5, -3, -1])

   def test_duplicates_and_zeros(self):
        arr = [2, 0, 3, 2, 1, 0, 1, 3]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [0, 0, 1, 1, 2, 2, 3, 3])

   def test_large_duplicate_elements(self):
        arr = [5, 5, 5, 5, 5, 5, 5]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [5, 5, 5, 5, 5, 5, 5])

   def test_large_negative_values(self):
        arr = [-1000, -500, -750, -300]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-1000, -750, -500, -300])

   def test_already_sorted_descending(self):
        arr = [5, 4, 3, 2, 1]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 2, 3, 4, 5])

   def test_mixed_large_range_odd_length(self):
        arr = [500, -100, 200, -50, 0]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-100, -50, 0, 200, 500])

   def test_large_range_odd_length(self):
        arr = [100, 200, -300, 400, -500, 600, -700]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-700, -500, -300, 100, 200, 400, 600])

   def test_repeated_pattern(self):
        arr = [1, 2, 3, 1, 2, 3, 1, 2, 3]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 1, 1, 2, 2, 2, 3, 3, 3])

   def test_large_random_numbers(self):
        arr = [987654321, 123456789, 555555555, 111111111]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [111111111, 123456789, 555555555, 987654321])

   def test_odd_length_reverse(self):
        arr = [9, 7, 5, 3, 1]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 3, 5, 7, 9])

   def test_almost_sorted_odd_length(self):
        arr = [1, 3, 2, 5, 4, 7, 6, 9, 8]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [1, 2, 3, 4, 5, 6, 7, 8, 9])

   def test_large_mixed_values(self):
        arr = [100, -5, 0, -1000, 500, 200, -300, 0, -200, 300]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [-1000, -300, -200, -5, 0, 0, 100, 200, 300, 500])

   def test_large_duplicates(self):
        arr = [9, 5, 3, 9, 5, 3, 9, 5, 3]
        self.assertEqual(my_sort(arr, 0, len(arr) - 1), [3, 3, 3, 5, 5, 5, 9, 9, 9])


if __name__ == '__main__':
    unittest.main()
