#  Write a function that takes an array of integers 
# and returns a new array with only the unique values.


array = input().split(',')
UniqueValue = set()
def Unique(array,UniqueValue):
    for ele in array:
        UniqueValue.add(ele)
    return UniqueValue
print(Unique(array,UniqueValue))
    