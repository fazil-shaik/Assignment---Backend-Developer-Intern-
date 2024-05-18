num = int(input())

def Factorial(num):
    if num==0 or num==1:
        return num
    return num*Factorial(num-1)
print('Factorial of given num '+str(num)+' is',Factorial(num))