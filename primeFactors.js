

const prime_factors = (num) =>{
    let primeArray = [];
    for(let i = 2; i <=num/2; i++){

        if(num % i == 0 ) primeArray.push(i); 

    }
    return primeArray;
}

console.log(prime_factors(24));