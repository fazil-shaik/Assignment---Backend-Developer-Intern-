# Implement a function to check if a given string is a palindrome.

str =  str(input('Enter the given string:  '))
def check(str):
    return str==str[::-1]
res = check(str)
if(res==True):
    print('Given string is palindrome: ')
else:
    print('Given string is not Palindrome: ')