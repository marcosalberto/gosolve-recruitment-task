import os
import sys
import bisect

class SearchService:
    def __init__(self, file_path, near_percentage_limit = 10):
        self.file_path = file_path
        self.data = None
        self.data_length = None
        self.near_percentage_limit = near_percentage_limit

        self.load()
    
    def load(self):
        """Reads data from file and stores in self.data"""
        try:
            with open(self.file_path, 'r', encoding='utf-8') as file:
                self.data = [int(line.strip()) for line in file]
                self.data_length = len(self.data)

        except FileNotFoundError:
            print(f"File not found {self.file_path}")
        except Exception as e:
            print(f"Error occurred {e}")

    def get_data(self):
        """Returns the loaded data"""
        return self.data
    
    def _is_near(self, near_percentage):
        percentage_min = 1 - self.near_percentage_limit / 100
        percentage_max = 1 + self.near_percentage_limit / 100

        return min(percentage_max,percentage_min)  < near_percentage < max(percentage_max,percentage_min)

    def search(self, value):
        """Returns index from given value"""

        index = bisect.bisect_left(self.data, value)
        
        if index < self.data_length and self.data[index] == value:
            return index
        
        if index == self.data_length and self._is_near(abs(self.data[index - 1] / value)):
            return index - 1
        
        if index < self.data_length and self._is_near(abs(self.data[index] / value)):
            return index

        return -1


