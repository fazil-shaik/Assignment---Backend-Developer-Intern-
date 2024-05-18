var num = 50;

const checkfactorial = (num)=>{
    if(num===0||num===1)
    {
        return num
    }
    return num*checkfactorial(num-1)
}

var res = checkfactorial(num)
console.log(`factorial of given number ${num} `+'is '+res)