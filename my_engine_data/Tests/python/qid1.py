import unittest
from solution import my_sort


class qid1test(unittest.TestCase):
   def test1(self):
      arr = [1, 5, -7, 2, 1]
      result = self.assertEqual(my_sort(arr, 0, len(arr)-1),[-7, 1, 1, 2, 5])

if __name__ == '__main__':
    unittest.main()
